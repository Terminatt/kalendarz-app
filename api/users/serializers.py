from rest_framework import serializers
from utils.custom_validators import CustomValidation
from users.models import User
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    group = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(
                validated_data['password'])
        return super(UserSerializer, self).update(instance, validated_data)

    def validate_email(self, email):
        CustomValidation.validate_email(email_field=email)

        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError("Taki email już istnieje")

        return email

    def validate_password(self, pswd):
        CustomValidation().validate_password(password=pswd)
        return pswd

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'email', 'title', 'password', 'username', 'groups']
        extra_kwargs = {'password': {'write_only': True}}