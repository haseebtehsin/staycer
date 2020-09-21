from rest_framework import serializers
from certificate.models import Certificate, Certification, Institute
from user.models import User, Profile
from rest_flex_fields import FlexFieldsModelSerializer


class InstituteSerializer (serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = '__all__'


class CertificateSerializer (FlexFieldsModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'
        expandable_fields = {
            'institute': (InstituteSerializer)}


class UserProfile (serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'picture')


class UserSerializer (serializers.ModelSerializer):
    profile = UserProfile()

    class Meta:
        model = User
        fields = ('id', 'email', 'profile')


class CertificationSerializer (FlexFieldsModelSerializer):

    class Meta:
        model = Certification
        fields = '__all__'
        expandable_fields = {
            'certificate': (CertificateSerializer),
            'user': (UserSerializer),
        }
