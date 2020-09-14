from rest_framework import serializers
from user.models import User, Profile
from certificate.models import Certification
from rest_flex_fields import FlexFieldsModelSerializer


class UserCertificationsSerializer (serializers.ModelSerializer):

    class Meta:
        model = Certification
        fields = '__all__'


class UserProfle (serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer (FlexFieldsModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
        write_only_fields = ['password']
        expandable_fields = {
            'certifications': (UserCertificationsSerializer),
            'profile': (UserProfle)
        }

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user)
        return user
