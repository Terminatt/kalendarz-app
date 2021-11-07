from rest_framework import serializers
from users.models import User
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
      validated_data['password'] = make_password(validated_data['password'])
      return super(UserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
          validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).update(instance, validated_data)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'title', 'password']
