from rest_framework import viewsets, permissions, filters
from user.models import User
from .serializer import UserSerializer
import django_filters.rest_framework


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter,
                       django_filters.rest_framework.DjangoFilterBackend]
    search_fields = ['username', 'email']
    filterset_fields = '__all__'
