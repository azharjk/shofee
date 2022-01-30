from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from products.views import ProductView, ProductViewDetail, ProductSearch

urlpatterns = [
    path('', ProductView.as_view()),
    path('<int:product_id>/', ProductViewDetail.as_view()),
    path('search/', ProductSearch.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
