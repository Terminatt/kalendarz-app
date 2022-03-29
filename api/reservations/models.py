from django.db import models
from rooms.models import Room
from users.models import User

class Reservation(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    confirmed = models.BooleanField(default=False)
    room = models.ForeignKey(Room, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        ordering = ['created']
