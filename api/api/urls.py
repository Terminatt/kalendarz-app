from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('users.urls')),
]

urlpatterns += [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls'))
]
