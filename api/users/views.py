from rest_framework import status
from rest_framework.response import Response
from utils.custom_expiring_obtain_auth_token import CustomExpiringObtainAuthToken
from utils.custom_view import CustomModelViewSet
from users.serializers import UserSerializer
from users.models import User
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ViewSet
from utils.custom_expiring_token import CustomExpiringToken

class UserViewSet(CustomModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [CustomExpiringToken]
    acl_name = "users"

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(None, status=status.HTTP_201_CREATED, headers=headers)


class LoginView(ViewSet):
    serializer_class = AuthTokenSerializer
    authentication_classes = []

    def create(self, request):
        return CustomExpiringObtainAuthToken().as_view()(request=request._request)

class AuthenticateView(ViewSet):
    authentication_classes = [CustomExpiringToken]
    
    def create(self, request):
        serializer = UserSerializer(instance=request.user)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    

class LogoutView(ViewSet):
    authentication_classes = [CustomExpiringToken]

    def list(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)