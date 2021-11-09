from django.db import models

from django.contrib.auth.models import AbstractUser, Group

class User(AbstractUser):
    email = models.TextField(unique=True)
    groups = models.ForeignKey(Group, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=24)
    last_name = models.CharField(max_length=24)
    password = models.TextField()
    title = models.CharField(max_length=24)
    created = models.DateTimeField(auto_now_add=True)
    is_super_admin = models.BooleanField(default=False)

    REQUIRED_FIELDS = ['groups_id', 'email']
    class Meta:
        ordering = ['created']
