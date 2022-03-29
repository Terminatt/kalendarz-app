from rest_framework import serializers
from rooms.models import Room
from rooms.serializers import RoomSerializer
from users.serializers import UserSerializer
from users.models import User
from reservations.models import Reservation

class ReservationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(default=serializers.CurrentUserDefault(), queryset=User.objects.all())
    room = serializers.PrimaryKeyRelatedField(default=serializers.CurrentUserDefault(), queryset=Room.objects.all())

    def to_representation(self, obj):
        self.fields['user'] = UserSerializer()

        if "no_page" not in self.context['request'].query_params:
            self.fields['room'] = RoomSerializer()

        return super(ReservationSerializer, self).to_representation(obj)
    class Meta:
        model = Reservation
        fields = ['id', 'created', 'start', 'end', 'room', 'user', 'confirmed']