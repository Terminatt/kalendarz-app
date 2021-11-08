import re
from typing import Generic, TypeVar
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from constants import EMAIL_REGEX, PASSWORD_MIN_LENGHT
from django.contrib.auth.password_validation import CommonPasswordValidator, MinimumLengthValidator, NumericPasswordValidator, UserAttributeSimilarityValidator
from rest_framework import serializers

T = TypeVar('T')


class ValidatorWithMessage(Generic[T]):
    """
    Provide custom error message for validation rather than using the default one
    """

    def __init__(self, validator: T, message: str):
        self.validator = validator
        self.error_message = message


class CustomValidation():
    """
    validator helpers for common fields
    """
    def validate_email(email):
        """
        Validate email against email regex
        """
        if (re.fullmatch(EMAIL_REGEX, email) == None):
            raise serializers.ValidationError(
                "To nie jest poprawny adres email")

    def validate_password(self, password):
        """
        Validate password with default validators provided by django

        CommonPasswordValidator
        MinimumLengthValidator
        ValidatorWithMessage
        """
        custom_validators = [
            ValidatorWithMessage(CommonPasswordValidator(),
                                 "To hasło jest zbyt proste"),
            ValidatorWithMessage(MinimumLengthValidator(
                min_length=PASSWORD_MIN_LENGHT), "Hasło powinno składać się z 9 znaków"),
            ValidatorWithMessage(NumericPasswordValidator(),
                                 "Hasło nie może składać się z samych cyfr")
        ]
        self.__validate_with_message(
            validators=custom_validators, field=password)

    def __validate_with_message(self, validators, field):
        """
        Helper for validating attributes that should have the custom message rather than default one
        """
        errors = []
        for v in validators:
            try:
                v.validator.validate(field)
            except ValidationError as error:
                errors.append(ValidationError(v.error_message))
        if errors:
            raise ValidationError(errors)
