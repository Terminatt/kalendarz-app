
from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions
from datetime import datetime, timedelta
from utils.response_error import ErrorType, get_error_dict
import pytz



class CustomExpiringToken(TokenAuthentication):
      """
        Override!

        Expiration token mechanism added
      """
      def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed(get_error_dict(errorType=ErrorType.USER_NOT_EXIST, msg='User does not exist'))

        now = datetime.utcnow()
        now = now.replace(tzinfo=pytz.utc)

        if token.created < now - timedelta(hours=24):
            raise exceptions.AuthenticationFailed(get_error_dict(errorType=ErrorType.TOKEN_EXPIRED, msg='Token has expired'))

        return (token.user, token)