from rooms.views import RoomTypeViewSet, RoomViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('room_types', RoomTypeViewSet)
router.register('rooms', RoomViewSet)

urlpatterns = router.urls
