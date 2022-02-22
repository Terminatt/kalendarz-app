from rest_framework import serializers

from api.reservations.models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'created', 'start', 'end', 'room', 'user']