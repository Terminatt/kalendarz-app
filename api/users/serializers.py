from rest_framework import serializers
from utils.response_error import ErrorType, ResponseError
from utils.custom_validators import CustomValidation
from users.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from constants import GROUPS
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField()

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['groups'] = Group.objects.get(name=GROUPS[1])
        return super(UserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(
                validated_data['password'])
        return super(UserSerializer, self).update(instance, validated_data)

    def validate_email(self, email):
        CustomValidation().validate_email(email_field=email)

        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError(ResponseError.get_error_dict(errorType=ErrorType.EMAIL_TAKEN, msg='User with this email arleady exists'))

        return email


    def validate_password(self, pswd):
        CustomValidation().validate_password(password=pswd)
        return pswd

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'email', 'title', 'password', 'username', 'groups', 'created']
        extra_kwargs = {
            'password': {'write_only': True},
            'groups': {'required': False},
            'username': {
                'validators': [
                    UniqueValidator(queryset=User.objects.all(), message=ResponseError.get_error_dict(errorType=ErrorType.USERNAME_TAKEN, msg='User with this username arleady exists'))
                ]
            },
        }