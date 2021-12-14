from users.views import LoginView, LogoutView, UserViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('users', UserViewSet, basename='users')
router.register('login', LoginView, basename='login')
router.register('logout', LogoutView, basename='logout')
