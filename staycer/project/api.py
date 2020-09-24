from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
import django_filters.rest_framework
from user.serializer import ScheduleSerializer
from project.models import Project
from user.models import Schedule
from .serializer import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    filter_backends = [filters.SearchFilter,
                       django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['name']
    search_fields = ['name']


class ProjectScheduleViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ScheduleSerializer

    def get_queryset(self):
        project = self.kwargs['project_id']
        return Schedule.objects.filter(project=project)
