
from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions
from datetime import datetime, timedelta
from utils.response_error import ErrorType, get_error_dict

import pytz



class CustomExpiringToken(TokenAuthentication):
      """
        Override!

        Extend with cookie authentication
      """
      def authenticate(self, request):
        if 'auth_token' in request.COOKIES and 'HTTP_AUTHORIZATION' not in request.META:
            token = request.COOKIES.get('auth_token')
            return self.authenticate_credentials(token)


        return super().authenticate(request)

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