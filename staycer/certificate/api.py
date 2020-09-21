from rest_framework import viewsets, permissions, status, filters
from rest_framework.response import Response
from certificate.models import Certificate, Certification, Institute, Trade
from .serializer import CertificateSerializer, CertificationSerializer, InstituteSerializer, TradeSerializer
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
    filter_backends = [filters.SearchFilter,
                       django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    search_fields = ['name']


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CertificationSerializer
    filter_class = CertificationFilter
    filter_backends = [filters.SearchFilter,
                       django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    search_fields = ['certificate__name']


class UserCertificationViewSet(viewsets.ModelViewSet):
    serializer_class = CertificationSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    filter_backends = [filters.SearchFilter,
                       django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['id', 'expiry_date']

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


class InstituteViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = InstituteSerializer
    queryset = Institute.objects.all()


class InstituteCertificateViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CertificateSerializer

    def get_queryset(self):
        institute = self.kwargs['institute_id']
        return Certificate.objects.filter(institute=institute)


class TradeViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TradeSerializer
    queryset = Trade.objects.all()


class TradeCertificateViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CertificateSerializer

    def get_queryset(self):
        trade_id = self.kwargs['trade_id']
        return Certificate.objects.filter(trades=trade_id)
