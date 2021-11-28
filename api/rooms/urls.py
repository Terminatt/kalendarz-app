from rooms.views import RoomTypeViewSet, RoomViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('room_types', RoomTypeViewSet)
router.register('rooms', RoomViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
