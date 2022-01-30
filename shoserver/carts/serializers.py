from rest_framework import serializers

from products.serializers import ProductWithoutUserSerializer, UserSerializer
from carts.models import Cart, OrderedProduct
from products.utils import transform_to_rupiah_format

class OrderedProductSerializer(serializers.ModelSerializer):
    product = ProductWithoutUserSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderedProduct
        fields = '__all__'

    def get_total_price(self, obj):
        total = obj.product.price * obj.qty
        return transform_to_rupiah_format(total)

class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    ordered_products = OrderedProductSerializer(read_only=True, many=True)

    class Meta:
        model = Cart
        fields = '__all__'
