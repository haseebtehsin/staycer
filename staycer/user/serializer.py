from rest_framework import serializers
from user.models import User, Profile
from certificate.models import Certification


class UserCertificationsSerializer (serializers.ModelSerializer):

    class Meta:
        model = Certification
        fields = '__all__'


class UserProfle (serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer (serializers.ModelSerializer):
    certifications = UserCertificationsSerializer(
        many=True, required=False, allow_null=True)
    profile = UserProfle(required=False)

    class Meta:
        model = User
        fields = '__all__'
        write_only_fields = ['password']
        read_only_fields = ['certifications', ]

    def create(self, validated_data):
        profile = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile)
        return user
