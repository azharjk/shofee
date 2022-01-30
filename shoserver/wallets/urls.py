from django.urls import path

from wallets.views import WalletDepositView

urlpatterns = [
    path('<int:user_id>/deposit', WalletDepositView.as_view())
]
