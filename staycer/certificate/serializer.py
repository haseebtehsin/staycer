from rest_framework import serializers
from certificate.models import Certificate, Certification
from user.models import User


class CertificateSerializer (serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'


class UserSerializer (serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')


class CertificationSerializer (serializers.ModelSerializer):
    # user = UserSerializer()

    class Meta:
        model = Certification
        fields = '__all__'
