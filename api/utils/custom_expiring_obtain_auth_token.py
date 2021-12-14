from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

class CustomExpiringObtainAuthToken(ObtainAuthToken):
      def post(self, request, *args, **kwargs):
        """
        Override!

        Create token everytime this endpoint is added
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        if hasattr(user, 'auth_token'):
          user.auth_token.delete()

        token = Token.objects.create(user=user)
        return Response({'token': token.key})