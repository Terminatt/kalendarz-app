from django.db import models

class RoomType(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=24)
    color = models.CharField(max_length=24)
    class Meta:
        ordering = ['created']

class Room(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=24)
    floor = models.CharField(max_length=24)
    type = models.ForeignKey(RoomType, null=True, on_delete=models.SET_NULL)
    class Meta:
        ordering = ['created']