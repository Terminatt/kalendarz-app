import re
from typing import Generic, TypeVar
from django.core.exceptions import ValidationError
from utils.response_error import ErrorType, get_error_dict
from constants import EMAIL_REGEX, PASSWORD_MIN_LENGHT
from django.contrib.auth.password_validation import CommonPasswordValidator, MinimumLengthValidator, NumericPasswordValidator
from rest_framework import serializers

T = TypeVar('T')


class ValidatorWithMessage(Generic[T]):
    """
    Provide custom error message for validation rather than using the default one

    Props:
        validator: an instance with validate function
        message: error message provided for validation
    """

    def __init__(self, validator: T, message: str):
        self.validator = validator
        self.error_message = message


class CustomUserValidation():
    """
    Validator helpers for common fields
    """

    def __validate_with_message(self, validators, field):
        """
        Helper for validating attributes that should have the custom message rather than default one

        Args:
            validators: array of validator instances
            field: field to validate against validator
        """
        errors = []
        for v in validators:
            try:
                v.validator.validate(field)
            except ValidationError as error:
                errors.append(ValidationError(v.error_message))
        if errors:
            raise ValidationError(errors)

    def validate_password(self, password):
        """
        Validate password with default validators provided by django

        CommonPasswordValidator
        MinimumLengthValidator
        ValidatorWithMessage

        Args:
            password: string containing password
        """
        custom_validators = [
            ValidatorWithMessage(CommonPasswordValidator(),
                                get_error_dict(errorType=ErrorType.PASSWORD_TOO_SIMPLE, msg='This password is too common and too simple')),
            ValidatorWithMessage(MinimumLengthValidator(min_length=PASSWORD_MIN_LENGHT), 
                                get_error_dict(errorType=ErrorType.PASSWORD_TOO_SHORT, msg=f'The password must have at least {PASSWORD_MIN_LENGHT} characters')),
            ValidatorWithMessage(NumericPasswordValidator(),
                                 get_error_dict(errorType=ErrorType.PASSWORD_NUMERIC, msg='The password cannot consist of only digits'))
        ]
        self.__validate_with_message(
            validators=custom_validators, field=password)

class PositiveNumber:
    def __call__ (self, value):
        if value <= 0:
            raise serializers.ValidationError(get_error_dict(errorType=ErrorType.NEGATIVE_NUMBER, msg='Provided number must be positive'))
class ProperEmail:
    def __call__ (self, value):
        if (re.fullmatch(EMAIL_REGEX, value) == None):
            raise serializers.ValidationError(get_error_dict(errorType=ErrorType.EMAIL_INCORRECT, msg='Provided email is incorrect'))