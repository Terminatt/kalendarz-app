from utils.custom_view import CustomModelViewSet
from rooms.models import RoomType, Room
from rooms.serializers import RoomTypeSerializer, RoomSerializer
from utils.custom_expiring_token import CustomExpiringToken

class RoomTypeViewSet(CustomModelViewSet):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer
    acl_name = "room_types"
    authentication_classes = [CustomExpiringToken]
    avoid_authentication = ['list']


class RoomViewSet(CustomModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    acl_name = "rooms"
    authentication_classes = [CustomExpiringToken]
    avoid_authentication = ['list']

