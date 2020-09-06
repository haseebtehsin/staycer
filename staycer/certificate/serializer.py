from rest_framework import serializers
from certificate.models import Certificate, Certification


class CertificateSerializer (serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'


class CertificationSerializer (serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'
