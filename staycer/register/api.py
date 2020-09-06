from rest_framework import viewsets, permissions
from register.models import User
from .serializer import UserSerializer
import django_filters.rest_framework


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
    filterset_fields = '__all__'
