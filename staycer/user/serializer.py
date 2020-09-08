from rest_framework import serializers
from user.models import User, Company, Address
from certificate.models import Certification


class UserCertificationsSerializer (serializers.ModelSerializer):

    class Meta:
        model = Certification
        fields = '__all__'


class UserSerializer (serializers.ModelSerializer):
    certifications = UserCertificationsSerializer(
        many=True, required=False, allow_null=True)

    class Meta:
        model = User
        fields = '__all__'
        write_only_fields = ['password']
        read_only_fields = ['certifications']
