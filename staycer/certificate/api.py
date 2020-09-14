from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from certificate.models import Certificate, Certification
from .serializer import CertificateSerializer, CertificationSerializer
import django_filters.rest_framework
from .filters import CertificationFilter


class CertificateViewSet(viewsets.ModelViewSet):
    # TODO: allow the ability to get all certificates
    # so that we are not limited by page size only
    queryset = Certificate.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CertificateSerializer
    filterset_fields = '__all__'


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CertificationSerializer
    filter_class = CertificationFilter


class UserCertificationViewSet(viewsets.ModelViewSet):
    serializer_class = CertificationSerializer

    def get_queryset(self):
        user = self.kwargs['user_id']
        return Certification.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user_id = self.kwargs['user_id']
        certification_serializer_data = request.data
        certification_serializer_data['user'] = user_id
        serializer = self.get_serializer(data=certification_serializer_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
