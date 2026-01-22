from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from django.db.models import Q
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings

from .models import Product, CartItem, Order, OrderItem
from .serializers import (
    ProductSerializer, CartItemSerializer, OrderSerializer, 
    OrderListSerializer, RegisterSerializer, UserSerializer
)


# ========== AUTHENTICATION VIEWS ==========

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """Register new user"""
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'success': True,
            'message': 'Registration successful',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """Login user"""
    from django.contrib.auth import authenticate
    
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({
            'success': False,
            'error': 'Username and password required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'success': True,
            'message': 'Login successful',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })
    
    return Response({
        'success': False,
        'error': 'Invalid credentials'
    }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """Get current user info"""
    return Response({
        'success': True,
        'user': UserSerializer(request.user).data
    })


# ========== PRODUCT VIEWS ==========

@api_view(['GET'])
@permission_classes([AllowAny])
def product_list(request):
    """
    Get all products with filtering and search
    Query params:
    - category: filter by category
    - search: search in name/description
    - min_price: minimum price
    - max_price: maximum price
    - ordering: sort by field
    """
    products = Product.objects.all()
    
    # Category filter
    category = request.GET.get('category')
    if category and category != 'all':
        products = products.filter(category=category)
    
    # Search
    search = request.GET.get('search')
    if search:
        products = products.filter(
            Q(name__icontains=search) | Q(description__icontains=search)
        )
    
    # Price range filter
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    if min_price:
        products = products.filter(price__gte=min_price)
    if max_price:
        products = products.filter(price__lte=max_price)
    
    # Ordering
    ordering = request.GET.get('ordering', '-created_at')
    products = products.order_by(ordering)
    
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request, pk):
    """Get single product"""
    try:
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response(
            {'error': 'Product not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )


# ========== CART VIEWS ==========

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    """Get cart items for authenticated user"""
    cart_items = CartItem.objects.filter(user=request.user).select_related('product')
    serializer = CartItemSerializer(cart_items, many=True)
    
    total = sum(item.quantity * item.product.price for item in cart_items)
    
    return Response({
        'cart_items': serializer.data,
        'total': str(total),
        'item_count': cart_items.count()
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    """Add item to cart"""
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)
    
    print(f"🔵 Add to Cart Request:")
    print(f"   User: {request.user}")
    print(f"   Product ID: {product_id}")
    print(f"   Quantity: {quantity}")
    
    if not product_id:
        return Response(
            {'success': False, 'error': 'Product ID required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        quantity = int(quantity)
        if quantity <= 0:
            return Response(
                {'success': False, 'error': 'Quantity must be greater than 0'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    except (ValueError, TypeError):
        return Response(
            {'success': False, 'error': 'Invalid quantity'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        product = Product.objects.get(pk=product_id)
        print(f"   ✅ Product found: {product.name}")
    except Product.DoesNotExist:
        print(f"   ❌ Product not found with ID: {product_id}")
        return Response(
            {'success': False, 'error': 'Product not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    if quantity > product.stock:
        return Response({
            'success': False, 
            'error': f'Insufficient stock. Only {product.stock} available.',
            'available_stock': product.stock
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Try to get existing cart item
        cart_item = CartItem.objects.filter(
            user=request.user,
            product=product
        ).first()
        
        if cart_item:
            # Update existing cart item
            new_quantity = cart_item.quantity + quantity
            if new_quantity > product.stock:
                return Response({
                    'success': False,
                    'error': f'Cannot add {quantity} more. Total would exceed stock.',
                    'current_in_cart': cart_item.quantity,
                    'available_stock': product.stock
                }, status=status.HTTP_400_BAD_REQUEST)
            
            cart_item.quantity = new_quantity
            cart_item.save()
            print(f"   ✅ Updated cart item to quantity: {new_quantity}")
        else:
            # Create new cart item
            cart_item = CartItem.objects.create(
                user=request.user,
                product=product,
                quantity=quantity
            )
            print(f"   ✅ Created new cart item")
        
        serializer = CartItemSerializer(cart_item)
        return Response({
            'success': True,
            'message': 'Added to cart',
            'cart_item': serializer.data
        })
        
    except Exception as e:
        print(f"   ❌ Error creating/updating cart item: {str(e)}")
        import traceback
        traceback.print_exc()
        return Response({
            'success': False,
            'error': f'Error adding to cart: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request):
    """Update cart item quantity"""
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
    
    try:
        cart_item = CartItem.objects.get(pk=cart_item_id, user=request.user)
    except CartItem.DoesNotExist:
        return Response(
            {'error': 'Cart item not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    if quantity > cart_item.product.stock:
        return Response({
            'error': f'Insufficient stock. Only {cart_item.product.stock} available.',
            'available_stock': cart_item.product.stock
        }, status=status.HTTP_400_BAD_REQUEST)
    
    cart_item.quantity = quantity
    cart_item.save()
    
    serializer = CartItemSerializer(cart_item)
    return Response({
        'success': True,
        'cart_item': serializer.data
    })


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, pk):
    """Remove item from cart"""
    try:
        cart_item = CartItem.objects.get(pk=pk, user=request.user)
        cart_item.delete()
        return Response({'success': True, 'message': 'Item removed from cart'})
    except CartItem.DoesNotExist:
        return Response(
            {'error': 'Cart item not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )


# ========== CHECKOUT VIEW ==========

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@transaction.atomic
def checkout(request):
    """Create order from cart"""
    cart_items = CartItem.objects.filter(user=request.user).select_related('product')
    
    if not cart_items.exists():
        return Response(
            {'error': 'Cart is empty'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    required_fields = ['customer_name', 'customer_email', 'customer_phone', 'customer_address']
    for field in required_fields:
        if not request.data.get(field):
            return Response(
                {'error': f'{field} is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    total_price = sum(item.quantity * item.product.price for item in cart_items)
    
    order = Order.objects.create(
        user=request.user,
        customer_name=request.data['customer_name'],
        customer_email=request.data['customer_email'],
        customer_phone=request.data['customer_phone'],
        customer_address=request.data['customer_address'],
        total_price=total_price
    )
    
    for cart_item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=cart_item.product,
            product_name=cart_item.product.name,
            price=cart_item.product.price,
            quantity=cart_item.quantity
        )
        
        cart_item.product.stock -= cart_item.quantity
        cart_item.product.save()
    
    cart_items.delete()
    
    send_mail(
        subject=f'Order Confirmation - #{order.id}',
        message=f'Thank you for your order! Order #{order.id} placed successfully.\n\nTotal: ₹{total_price}',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[order.customer_email],
        fail_silently=True,
    )
    
    serializer = OrderSerializer(order)
    return Response({
        'success': True,
        'message': 'Order created successfully',
        'order': serializer.data
    }, status=status.HTTP_201_CREATED)


# ========== ORDER VIEWS ==========

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_history(request):
    """Get user's order history"""
    orders = Order.objects.filter(user=request.user).prefetch_related('items')
    serializer = OrderListSerializer(orders, many=True)
    return Response({
        'success': True,
        'orders': serializer.data
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detail(request, pk):
    """Get single order details"""
    try:
        order = Order.objects.get(pk=pk, user=request.user)
        serializer = OrderSerializer(order)
        return Response({
            'success': True,
            'order': serializer.data
        })
    except Order.DoesNotExist:
        return Response(
            {'error': 'Order not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )