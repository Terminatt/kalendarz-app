from rooms.views import RoomTypeViewSet, RoomViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'room_types', RoomTypeViewSet)
router.register(r'rooms', RoomViewSet)

urlpatterns = router.urls
