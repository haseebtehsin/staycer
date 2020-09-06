from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('register.urls')),
    path('', include('certificate.urls')),
    path('admin/', admin.site.urls),
]
