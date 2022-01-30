from django.contrib.auth.models import User
from django.http import HttpResponseBadRequest

from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product
from products.serializers import ProductSerializer, UserSerializer
from wallets.models import Wallet
from wallets.serializers import UserWithWalletSerializer

class ProductView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class ProductViewDetail(APIView):
    def get(self, request, product_id):
        product = Product.objects.get(pk=product_id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

class ProductSearch(APIView):
    def get(self, request):
        query = request.GET.get('q')
        if query is None:
            query = ''
        products = Product.objects.filter(name__icontains=query)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class UserView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class UserViewDetail(APIView):
    def get(self, request, user_id):
        product = User.objects.get(pk=user_id)
        serializer = UserWithWalletSerializer(product)
        return Response(serializer.data)

    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        if User.objects.filter(username=username).exists():
            return HttpResponseBadRequest()

        user = User.objects.create_user(username=username, password=password)
        print(user.id)
        wallet = Wallet.objects.create(user=user, balance=0)
        token = Token.objects.create(user=user)
        serializer = UserSerializer(user)
        return Response({
            'token': token.key,
            'user': serializer.data
        }, status=201)

class AuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_serializer = UserSerializer(user)
        token = Token.objects.get(user=user)
        return Response({
            'token': token.key,
            'user': user_serializer.data
        })

class TokenUser(APIView):
    def post(self, request):
        token = request.data['token']
        t = Token.objects.get(key=token)
        serializer = UserSerializer(t.user)
        return Response(serializer.data)
