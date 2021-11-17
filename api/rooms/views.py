from django.shortcuts import render
from utils.custom_view import CustomModelViewSet
from users.permission import IsAdminUser
from rooms.models import RoomType, Room
from rooms.serializers import RoomTypeSerializer, RoomSerializer
from rest_framework.authentication import TokenAuthentication

class RoomTypeViewSet(CustomModelViewSet):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer
    authentication_classes = [TokenAuthentication]
    acl_name = "room_types"

class RoomViewSet(CustomModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    authentication_classes = [TokenAuthentication]
    acl_name = "rooms"