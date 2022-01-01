from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from users.serializers import UserSerializer

class CustomExpiringObtainAuthToken(ObtainAuthToken):
      def post(self, request):
        """
        Override!

        Create token everytime this endpoint is called
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        if hasattr(user, 'auth_token'):
          user.auth_token.delete()

        token = Token.objects.create(user=user)
        user_serializer = UserSerializer(instance=user)
        
        return Response({'token': token.key, 'user': user_serializer.data})