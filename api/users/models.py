from django.db import models
from django.contrib.auth.models import AbstractUser, Group

class User(AbstractUser):
    email = models.EmailField(unique=True, max_length=50)
    groups = models.ForeignKey(Group, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=24)
    last_name = models.CharField(max_length=24)
    password = models.CharField(max_length=24)
    title = models.CharField(max_length=24)
    created = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ['groups_id', 'email']
    class Meta:
        ordering = ['created']

    def get_full_name(self):
        return '%s %s' % (self.first_name, self.last_name)

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.username
