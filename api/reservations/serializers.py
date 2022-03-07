from rest_framework import serializers
from users.serializers import UserSerializer
from users.models import User
from reservations.models import Reservation

class ReservationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(default=serializers.CurrentUserDefault(), queryset=User.objects.all())

    def to_representation(self, obj):
        self.fields['user'] = UserSerializer()
        return super(ReservationSerializer, self).to_representation(obj)
    class Meta:
        model = Reservation
        fields = ['id', 'created', 'start', 'end', 'room', 'user']