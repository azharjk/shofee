from django.urls import path

from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.urlpatterns import format_suffix_patterns

from products.views import UserView, UserViewDetail, AuthToken, TokenUser # check_is_login, logout_session

urlpatterns = [
    path('', UserView.as_view()),
    path('<int:user_id>/', UserViewDetail.as_view()),
    path('create/', UserViewDetail.as_view()),
    # path('logout/', logout_session),
    # path('check-is-login/', check_is_login),
    path('api-token-auth/', AuthToken.as_view()),
    path('api-token-user/', TokenUser.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)

