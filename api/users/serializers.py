from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from constants import EMAIL_REGEX
from users.models import User
from django.contrib.auth.hashers import make_password
import re


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
      validated_data['password'] = make_password(validated_data['password'])
      return super(UserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
          validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).update(instance, validated_data)

    def validate(self, data):
      if (re.fullmatch(EMAIL_REGEX, data['email'])):
        raise serializers.ValidationError("To nie jest poprawny adres email")
      return data


    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'title', 'password']
        validators = [UniqueValidator(queryset=User.objects.all())]
