from rest_framework import viewsets, permissions
from certificate.models import Certificate, Certification
from .serializer import CertificateSerializer, CertificationSerializer
import django_filters.rest_framework


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CertificateSerializer
    filterset_fields = '__all__'


class CertificationViewSet(viewsets.ModelViewSet):
    queryset = Certification.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CertificationSerializer
    filterset_fields = '__all__'
