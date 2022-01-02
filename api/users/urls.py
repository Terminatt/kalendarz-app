from users.views import AuthenticateView, LoginView, LogoutView, AuthenticateView, UserViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('users', UserViewSet, basename='users')
router.register('login', LoginView, basename='login')
router.register('logout', LogoutView, basename='logout')
router.register('authenticate', AuthenticateView, basename='authenticate')
