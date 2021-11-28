from django.contrib import admin
from django.urls import path, include
import os

urlpatterns = [
    path('', include('users.urls')),
]

urlpatterns += [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
    path('', include('rooms.urls'))
]
