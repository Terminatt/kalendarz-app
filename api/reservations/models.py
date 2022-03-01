from django.db import models
from rooms.models import Room
from users.models import User

class Reservation(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    room = models.ForeignKey(Room, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    class Meta:
        ordering = ['created']
