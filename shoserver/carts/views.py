from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response

from products.models import Product
from carts.models import Cart, OrderedProduct
from carts.serializers import CartSerializer

class CartView(APIView):
    def get(self, request):
        carts = Cart.objects.all()
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        user_id = request.data['user_id']
        product_id = request.data['ordered_product']['product_id']
        qty = request.data['ordered_product']['qty']

        user = User.objects.get(pk=user_id)
        product = Product.objects.get(pk=product_id)
        cart = Cart.objects.create(user=user)
        ordered_product = OrderedProduct.objects.create(cart=cart, product=product, qty=qty)

        serializer = CartSerializer(cart)
        return Response(serializer.data)

class CartDetailView(APIView):
    def get(self, request, user_id):
        print(user_id)
        carts = Cart.objects.all().filter(user_id=user_id)
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data)

class CartCheckoutView(APIView):
    def post(self, request, ordered_product_id):
        print(ordered_product_id)
        op = OrderedProduct.objects.get(pk=ordered_product_id)
        op.delete()
        # carts = Cart.objects.all().filter(user_id=user_id)
        return Response('hello')
