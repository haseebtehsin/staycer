from rest_framework import viewsets, permissions
from rest_framework.response import Response
from project.models import Project
from .serializer import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
