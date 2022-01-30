from django.urls import path

from carts.views import CartView, CartDetailView, CartCheckoutView

urlpatterns = [
    path('', CartView.as_view()),
    path('<int:user_id>/', CartDetailView.as_view()),
    path('<int:ordered_product_id>/checkout', CartCheckoutView.as_view())
]
