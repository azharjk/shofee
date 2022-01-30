from django.contrib.auth.models import User

from rest_framework import serializers

from products.utils import transform_to_rupiah_format
from products.serializers import ProductWithoutUserSerializer
from wallets.models import Wallet

class WalletSerializer(serializers.ModelSerializer):
    balance_formatted = serializers.SerializerMethodField()

    class Meta:
        model = Wallet
        fields = '__all__'

    def get_balance_formatted(self, wallet):
        return transform_to_rupiah_format(wallet.balance)


class UserWithWalletSerializer(serializers.ModelSerializer):
    wallet = WalletSerializer(read_only=True)
    products = ProductWithoutUserSerializer(read_only=True, many=True)
    products_count = serializers.IntegerField(
        source='products.count', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'username', 'email', 'products', 'products_count', 'wallet']
