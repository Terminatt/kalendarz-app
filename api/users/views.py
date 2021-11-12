from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from api.utils.custom_view import CustomModelViewSet
from users.serializers import UserSerializer
from users.permission import IsAdminUser, IsLoggedInUserOrAdmin
from users.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.viewsets import ViewSet

class UserViewSet(CustomModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]

    pc_list = [IsAdminUser]
    pc_retrieve = [IsLoggedInUserOrAdmin]
    pc_update = [IsLoggedInUserOrAdmin]
    pc_delete = [IsLoggedInUserOrAdmin]


class LoginView(ViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request):
        return ObtainAuthToken().as_view()(request=request._request)

class LogoutView(APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)