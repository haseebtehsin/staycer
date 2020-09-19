from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from user.models import User
from .serializer import UserSerializer, UserProfile
import django_filters.rest_framework
from django.db.models import Count


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(role=User.WORKER)
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter,
                       django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['date_joined', 'email']
    search_fields = ['email']
    filterset_fields = '__all__'
    parser_classes = (FormParser, MultiPartParser, JSONParser)

    @action(detail=True, methods=["PUT", "PATCH"])
    def profile(self, request, pk=None):
        user = self.get_object()
        profile = user.profile
        serializer = UserProfile(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)

    def get_queryset(self):
        return super().get_queryset().annotate(total_certifications=Count('certifications'))
