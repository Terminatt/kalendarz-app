from utils.permission_model_view_set import PermissionModelViewSet
from rooms.models import RoomType, Room
from rooms.serializers import RoomTypeSerializer, RoomSerializer
from utils.custom_expiring_token import CustomExpiringToken
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

class RoomTypeViewSet(PermissionModelViewSet):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer
    acl_name = "room_types"
    authentication_classes = [CustomExpiringToken]
    avoid_authentication = ['list', 'retrieve']
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class RoomViewSet(PermissionModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    acl_name = "rooms"
    authentication_classes = [CustomExpiringToken]
    avoid_authentication = ['list', 'retrieve']
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['type']
    search_fields = ['name']

