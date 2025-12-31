from rest_framework import serializers
from .models import Product, CartItem, Order, OrderItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['id','name', 'description', 'image_url', 'price', 'stock', 'category', 'created_at']


class CartItemSerializer(serializers.ModelSerializer):
    product=ProductSerializer(read_only=True)
    subtotal=serializers.SerializerMethodField()

    class Meta:
        model= CartItem
        fields=['id', 'product', 'quantity', 'subtotal', 'created_at' ]
    
    def get_subtotal(self, obj):
        return obj.quantity * obj.product.price
    

class OrderItemSerializer(serializers.ModelSerializer):
    subtotal=serializers.SerializerMethodField()

    class Meta:
        model= CartItem
        fields=['id', 'product', 'product_name', 'price', 'quantity', 'subtotal']
    
    def get_subtotal(self, obj):
        return obj.quantity * obj.price
    

class OrderSerializer(serializers.ModelSerializer):
    item=OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model=OrderItem
        fields=['id', 'customer_name', 'customer_email', 'customer_phone', 'customer_address', 'total_price', 'created_at']