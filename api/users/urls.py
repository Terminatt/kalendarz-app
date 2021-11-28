from users.views import LoginView, LogoutView, UserViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', UserViewSet, basename='User Routes')
router.register('login', LoginView, basename='Login')

urlpatterns = [
    path('', include(router.urls)),
    path('account/logout/', LogoutView.as_view(), name='logout')
]
