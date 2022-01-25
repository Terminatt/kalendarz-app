from rest_framework import serializers
from utils.response_error import ErrorType, get_error_dict
from rooms.models import RoomType, Room
from rest_framework.validators import UniqueValidator

class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomType
        fields = ['id', 'name', 'color', 'created']
        extra_kwargs = {
            'name': {
                'validators': [
                    UniqueValidator(queryset=RoomType.objects.all(), message=get_error_dict(errorType=ErrorType.NOT_UNIQUE_NAME, msg='The name of this object must be unique'))
                ]
            },
        }

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'floor', 'type', 'created']
        extra_kwargs = {
            'name': {
                'validators': [
                    UniqueValidator(queryset=Room.objects.all(), message=get_error_dict(errorType=ErrorType.NOT_UNIQUE_NAME, msg='The name of this object must be unique'))
                ]
            },
        }