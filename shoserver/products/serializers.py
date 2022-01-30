from django.contrib.auth.models import User

from rest_framework import serializers

from products.models import Product
from products.utils import transform_to_rupiah_format


class ProductWithoutUserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        exclude = 'user',

    def get_image(self, product):
        return f'http://localhost:8000/media/{product.image}'

    def get_price(self, product):
        return transform_to_rupiah_format(product.price)

    def get_price_real(self, product):
        return product.price


class UserSerializer(serializers.ModelSerializer):
    products = ProductWithoutUserSerializer(read_only=True, many=True)
    products_count = serializers.IntegerField(
        source='products.count', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'username', 'email', 'products', 'products_count']


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, product):
        return f'http://localhost:8000/media/{product.image}'

    def get_price(self, product):
        return transform_to_rupiah_format(product.price)
