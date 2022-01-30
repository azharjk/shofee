from rest_framework.views import APIView
from rest_framework.response import Response

from wallets.models import Wallet
from wallets.serializers import WalletSerializer

class WalletDepositView(APIView):
    def post(self, request, user_id):
        amount = request.data['amount']
        wallet = Wallet.objects.get(user=user_id)
        wallet.balance += amount
        wallet.save()
        serializer = WalletSerializer(wallet)
        return Response(serializer.data)
