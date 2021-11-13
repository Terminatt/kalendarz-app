from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('users.urls')),
]

urlpatterns += [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('rooms', include('rooms.urls'))
]
