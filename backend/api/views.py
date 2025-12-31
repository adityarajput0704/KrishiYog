from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from .models import Product, CartItem, Order, OrderItem
from .serializers import ProductSerializer, CartItemSerializer, OrderItemSerializer, OrderSerializer

# Create your views here.
def get_session_id(request):
    if not request.session.session_key:
        request.session.create()
    return request.session.session_key
 

@api_view(['GET'])
def product_list(request):
    category = request.GET.get('category', None)
    
    if category and category != 'all':
        products = Product.objects.filter(category=category)
    else:
        products = Product.objects.all()
    
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response(
            {'error':'Product not found'},
            status=status.HTTP_404_NOT_FOUND
            )
    
@api_view(['POST'])
def add_to_cart(request):
    product_id=request.data.get("product_id")
    quantity=request.data.get('quantity',1)

    if not product_id:
        return Response(
            {'success':False, 'error':'Product ID required'},
            status=status.HTTP_404_BAD_REQUEST
        )
    
    try:
        quantity=int(quantity)
        if quantity<=0:
            return Response(
                {'success':False, 'error':'Quantity must be specified'},
            status=status.HTTP_404_BAD_REQUEST
            )
    except (ValueError, TypeError):
        return Response(
            {'success': False, 'error': 'Invalid quantity'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response(
            {'success': False, 'error': 'Product not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    if quantity > Product.stock:
        return Response({
                        'success': False, 
            'error': f'Insufficient stock. Only {Product.stock} available.',
            'available_stock': Product.stock
        }, status=status.HTTP_400_BAD_REQUEST
        )
    
    session_id=get_session_id(request)
    cart_item, created= CartItem.objects.get_or_create(
        session_id=session_id,
        product=product,
        defaults={'quantity':quantity}
    )

    if not created:
        new_quantity = cart_item.quantity + quantity

    if new_quantity > Product.stock:
            return Response({
                'success': False,
                'error': f'Cannot add {quantity} more. Total would exceed stock.',
                'current_in_cart': cart_item.quantity,
                'available_stock': Product.stock
            }, status=status.HTTP_400_BAD_REQUEST)
        
    cart_item.quantity = new_quantity
    cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response({
        'success': True,
        'message': 'Added to cart',
        'cart_item': serializer.data
    })

@api_view(['GET'])
def get_cart(request):
    session_id = get_session_id(request)
    cart_items = CartItem.objects.filter(session_id=session_id).select_related('product')
    
    serializer = CartItemSerializer(cart_items, many=True)
    
    # Calculate total (BACKEND CALCULATION - never trust frontend!)
    total = sum(item.quantity * item.product.price for item in cart_items)
    
    return Response({
        'cart_items': serializer.data,
        'total': str(total),  # Convert Decimal to string for JSON
        'item_count': cart_items.count()
    })


@api_view(['PUT'])
def update_cart_item(request):
    cart_item_id = request.data.get('cart_item_id')
    quantity = request.data.get('quantity')
    
    try:
        quantity = int(quantity)
        if quantity <= 0:
            return Response(
                {'error': 'Quantity must be greater than 0'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    except (ValueError, TypeError):
        return Response(
            {'error': 'Invalid quantity'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Get cart item
    try:
        cart_item = CartItem.objects.get(pk=cart_item_id)
    except CartItem.DoesNotExist:
        return Response(
            {'error': 'Cart item not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Check stock
    if quantity > cart_item.product.stock:
        return Response({
            'error': f'Insufficient stock. Only {cart_item.product.stock} available.',
            'available_stock': cart_item.product.stock
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Update quantity
    cart_item.quantity = quantity
    cart_item.save()
    
    serializer = CartItemSerializer(cart_item)
    return Response({
        'success': True,
        'cart_item': serializer.data
    })


@api_view(['DELETE'])
def remove_from_cart(request, pk):
    """DELETE /api/cart/remove/3/ - Remove item from cart"""
    try:
        cart_item = CartItem.objects.get(pk=pk)
        cart_item.delete()
        return Response({
            'success': True, 
            'message': 'Item removed from cart'
        })
    except CartItem.DoesNotExist:
        return Response(
            {'error': 'Cart item not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )


# =============== CHECKOUT ENDPOINT ===============

@api_view(['POST'])
@transaction.atomic  # CRITICAL: All-or-nothing (if any step fails, undo everything)
def checkout(request):
    """
    POST /api/checkout/
    Body: {
        "customer_name": "John Doe",
        "customer_email": "john@example.com",
        "customer_phone": "+1234567890",
        "customer_address": "123 Main St"
    }
    
    Process:
    1. Validate cart not empty
    2. Validate customer info
    3. Calculate total (BACKEND!)
    4. Create Order
    5. Create OrderItems (COPY prices!)
    6. Reduce stock
    7. Clear cart
    """
    session_id = get_session_id(request)
    
    # Get cart items
    cart_items = CartItem.objects.filter(session_id=session_id).select_related('product')
    
    if not cart_items.exists():
        return Response(
            {'error': 'Cart is empty'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Validate customer info
    required_fields = ['customer_name', 'customer_email', 'customer_phone', 'customer_address']
    for field in required_fields:
        if not request.data.get(field):
            return Response(
                {'error': f'{field} is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    # Calculate total (BACKEND CALCULATION!)
    total_price = sum(item.quantity * item.product.price for item in cart_items)
    
    # Create order
    order = Order.objects.create(
        session_id=session_id,
        customer_name=request.data['customer_name'],
        customer_email=request.data['customer_email'],
        customer_phone=request.data['customer_phone'],
        customer_address=request.data['customer_address'],
        total_price=total_price
    )
    
    # Create order items and reduce stock
    for cart_item in cart_items:
        # Create OrderItem (COPY price and name - freeze at purchase time!)
        OrderItem.objects.create(
            order=order,
            product=cart_item.product,
            product_name=cart_item.product.name,  # COPY
            price=cart_item.product.price,         # COPY
            quantity=cart_item.quantity
        )
        
        # Reduce stock
        cart_item.product.stock -= cart_item.quantity
        cart_item.product.save()
    
    # Clear cart
    cart_items.delete()
    
    # Return order details
    serializer = OrderSerializer(order)
    return Response({
        'success': True,
        'message': 'Order created successfully',
        'order': serializer.data
    }, status=status.HTTP_201_CREATED)