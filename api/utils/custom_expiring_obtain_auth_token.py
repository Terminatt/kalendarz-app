from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from api.constants import TOKEN_EXPIRATION
from api.settings import DEBUG
from utils.response_error import ErrorType, get_error_dict
from users.serializers import UserSerializer
from datetime import datetime, timedelta
import pytz

class CustomExpiringObtainAuthToken(ObtainAuthToken):
      authentication_classes = []
      
      def post(self, request):
        """
        Override!

        Create token everytime this endpoint is called
        """
        serializer = self.get_serializer(data=request.data)
        is_valid = serializer.is_valid()

        if not is_valid:
          raise ValidationError(get_error_dict(ErrorType.INVALID_CREDENTIALS, 'Unable to log in with provided credentials.'))
        
        user = serializer.validated_data['user']

        if hasattr(user, 'auth_token'):
          user.auth_token.delete()

        token = Token.objects.create(user=user)
        user_serializer = UserSerializer(instance=user)
        res = Response(user_serializer.data)

        now = datetime.utcnow()
        now = now.replace(tzinfo=pytz.utc)

        res.set_cookie(
            'auth_token',
            token.key,
            httponly=True,
            samesite=None if DEBUG else 'lax',
            secure=True,
            expires= now + timedelta(hours=TOKEN_EXPIRATION)
        )
        return res