from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
import django_filters.rest_framework
from user.serializer import ScheduleSerializer
from project.models import Project
from user.models import Schedule
from .serializer import ProjectSerializer
from django.db.models import Count


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    filter_backends = [filters.SearchFilter,
                       django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['id']
    search_fields = ['name']

    def get_queryset(self):
        return super().get_queryset().annotate(total_scheduled=Count('project_schedules'))


class ProjectScheduleViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ScheduleSerializer

    filter_backends = [filters.SearchFilter,
                       django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    search_fields = ['user__profile__first_name', 'user__profile__last_name']

    def get_queryset(self):
        project = self.kwargs['project_id']
        return Schedule.objects.filter(project=project)
