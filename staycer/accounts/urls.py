from django.conf.urls import url
from .api import AuthLoginView, AuthUserView
from knox import views as knox_views

urlpatterns = [
    url("api/v1/auth/login/", AuthLoginView.as_view()),
    url("api/v1/auth/user/", AuthUserView.as_view()),
    url("api/v1/auth/logout/", knox_views.LogoutView.as_view(), name="knox_logout"),
]
