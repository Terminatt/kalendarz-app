from reservations.models import Reservation
from reservations.serializers import ReservationSerializer
from utils.custom_expiring_token import CustomExpiringToken
from utils.custom_view import CustomModelViewSet
from django_filters.rest_framework import DjangoFilterBackend


class ReservationViewSet(CustomModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    acl_name = "reservation"
    authentication_classes = [CustomExpiringToken]
    avoid_authentication = ['list']
    filter_backends = [DjangoFilterBackend]
