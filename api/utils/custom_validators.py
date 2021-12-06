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
    def validate_email(self, email_field):
        """
        Validate email against email regex
        """
        if (re.fullmatch(EMAIL_REGEX, email_field) == None):
            raise serializers.ValidationError(
                "This is not a valid email address")

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

    def validate_password(self, password):
        """
        Validate password with default validators provided by django

        CommonPasswordValidator
        MinimumLengthValidator
        ValidatorWithMessage
        """
        custom_validators = [
            ValidatorWithMessage(CommonPasswordValidator(),
                                 "This password is too common and too simple"),
            ValidatorWithMessage(MinimumLengthValidator(
                min_length=PASSWORD_MIN_LENGHT), f"The password must have at least {PASSWORD_MIN_LENGHT} characters"),
            ValidatorWithMessage(NumericPasswordValidator(),
                                 "The password cannot consist of only digits")
        ]
        self.__validate_with_message(
            validators=custom_validators, field=password)
