from django.db import models

# Create your models here.
class Product(models.Model):
    CATEGORY_CHOICES = [
        ('fruit', 'Fruit'),
        ('vegetable', 'Vegetable'),
        ('grain', 'Grain'),
    ]

    name=models.CharField(max_length=200)
    description=models.TextField()
    image_url=models.URLField()
    price=models.DecimalField(max_digits=8,decimal_places=2)
    stock=models.IntegerField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='fruit')  
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CartItem(models.Model):
    session_id=models.CharField(max_length=100)
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity=models.IntegerField()
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
    
class Order(models.Model):
    session_id=models.CharField(max_length=100)
    customer_name=models.CharField(max_length=100)
    customer_email=models.EmailField()
    customer_phone=models.CharField(max_length=15)
    customer_address=models.TextField()
    total_price=models.DecimalField(max_digits=8, decimal_places=2)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} --> {self.customer_name}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')  # ← Stores Order.id
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)  # ← Can be null if product deleted
    product_name = models.CharField(max_length=200)  # Historical copy
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Historical copy
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product_name}"

    