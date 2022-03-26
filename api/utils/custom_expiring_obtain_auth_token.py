from multiprocessing import AuthenticationError
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from constants import COOKIE_SAME_SITE, TOKEN_EXPIRATION
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

        if (user.perma_banned):
          raise AuthenticationError(get_error_dict(ErrorType.PERMA_BANNED, 'User was permamently banned'))

        banned_till = user.banned_till
        if (datetime.utcnow() < datetime.strptime()):
          raise AuthenticationError(get_error_dict(ErrorType.TEMPORARY_BANNED, 'User was temporary banned', {'banned_till': banned_till}))


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
            samesite=COOKIE_SAME_SITE,
            secure=True,
            expires= now + timedelta(hours=TOKEN_EXPIRATION)
        )
        return res