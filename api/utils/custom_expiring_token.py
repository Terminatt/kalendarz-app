
from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions
from datetime import datetime, timedelta
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
            raise exceptions.AuthenticationFailed('Invalid token.')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('The user is not active yet.')

        now = datetime.utcnow()
        now = now.replace(tzinfo=pytz.utc)

        if token.created < now - timedelta(hours=24):
            raise exceptions.AuthenticationFailed('Token has expired')

        return (token.user, token)