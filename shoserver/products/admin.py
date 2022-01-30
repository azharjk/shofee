from django.contrib import admin

from products.models import Product
from products.utils import transform_to_rupiah_format

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = 'name', 'price_formatted', 'user'

    def price_formatted(self, obj):
        return transform_to_rupiah_format(obj.price)
