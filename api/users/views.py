from users.serializers import UserSerializer
from users.models import User
from rest_framework import viewsets


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed, created, listed, updated, deleted.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
