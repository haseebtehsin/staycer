from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from user.models import User, Position
from .serializer import UserSerializer, UserProfile, PositionSerializer, ScheduleSerializer
from .filters import UserFilter
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
    filter_class = UserFilter
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


class PositionViewSet(viewsets.ModelViewSet):
    queryset = Position.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PositionSerializer


class UserScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = ScheduleSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    # filter_backends = [filters.SearchFilter,
    #                    django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    # ordering_fields = ['id', 'expiry_date']

    # def get_queryset(self):
    #     user = self.kwargs['user_id']
    #     return Certification.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user_id = self.kwargs['user_id']
        schedule_serializer_data = request.data
        schedule_serializer_data['user'] = user_id
        serializer = self.get_serializer(data=schedule_serializer_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
