from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = None
    username_validator = None

    first_name = models.CharField(max_length=24)
    last_name = models.CharField(max_length=24)
    email = models.TextField(unique=True)
    password = models.TextField()
    title = models.CharField(max_length=24)
    created = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ['created']
