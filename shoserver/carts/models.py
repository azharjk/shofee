from django.contrib.auth.models import User
from django.db import models

from products.models import Product

class Cart(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True
    )
    # ordered_products = models.ForeignKey(OrderedProduct, on_delete=models.DO_NOTHING)

class OrderedProduct(models.Model):
    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        primary_key=True
    )
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE
    )
    qty = models.IntegerField(default=1)
