from rest_framework import serializers
from users.models import User
from reservations.models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(default=serializers.CurrentUserDefault(), queryset=User.objects.all())
    class Meta:
        model = Reservation
        fields = ['id', 'created', 'start', 'end', 'room']