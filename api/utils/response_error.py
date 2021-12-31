class ErrorType():
  USERNAME_TAKEN = 'USERNAME_TAKEN'
  EMAIL_TAKEN = 'EMAIL_TAKEN'
  PASSWORD_TOO_SIMPLE = 'PASSWORD_TOO_SIMPLE'
  PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT'
  PASSWORD_NUMERIC = 'PASSWORD_NUMERIC'
  EMAIL_INCORRECT = 'EMAIL_INCORRECT'

class ResponseError:
  def get_error_dict(errorType, msg):
    return {'type': errorType, 'message': msg}
