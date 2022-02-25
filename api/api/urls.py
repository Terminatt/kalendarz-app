from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from users.urls import router as users_router
from rooms.urls import router as rooms_router
from reservations.urls import router as reservations_router

defaultRouter = DefaultRouter()

defaultRouter.registry.extend(users_router.registry)
defaultRouter.registry.extend(rooms_router.registry)
defaultRouter.registry.extend(reservations_router.registry)

urlpatterns = defaultRouter.urls

urlpatterns += [
    path(r'admin/', admin.site.urls),
]
