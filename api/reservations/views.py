from reservations.models import Reservation
from reservations.serializers import ReservationSerializer
from utils.custom_expiring_token import CustomExpiringToken
from utils.custom_view import CustomModelViewSet
import django_filters
from django_filters.rest_framework import DjangoFilterBackend

class ReservationFilter(django_filters.FilterSet):
    start_min = django_filters.IsoDateTimeFilter(field_name='start', lookup_expr='gte')
    start_max = django_filters.IsoDateTimeFilter(field_name='start', lookup_expr='lte')
    user = django_filters.Filter(field_name="user")
    class Meta:
        model = Reservation
        fields = ['start']

class ReservationViewSet(CustomModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    acl_name = "reservation"
    authentication_classes = [CustomExpiringToken]
    avoid_authentication = ['list']
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReservationFilter
    create_many = True

