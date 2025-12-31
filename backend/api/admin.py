from django.contrib import admin
from .models import Product, CartItem, Order, OrderItem
# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'price', 'stock', 'created_at']
    list_filter = ['category']
    search_fields = ['name', 'description']

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'product', 'quantity', 'session_id', 'created_at']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer_name', 'customer_email', 'total_price', 'created_at']
    search_fields = ['customer_name', 'customer_email']

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product_name', 'price', 'quantity']