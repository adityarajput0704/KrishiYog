from django.urls import path
from . import views

urlpatterns=[
    path('products/', views.product_list, name='product-list'),
    path('products/<int:pk>/', views.product_detail, name='product-detail'),
    
    # Cart
    path('cart/', views.get_cart, name='get-cart'),
    path('cart/add/', views.add_to_cart, name='add-to-cart'),
    path('cart/update/', views.update_cart_item, name='update-cart'),
    path('cart/remove/<int:pk>/', views.remove_from_cart, name='remove-from-cart'),
    
    # Checkout
    path('checkout/', views.checkout, name='checkout'),
]