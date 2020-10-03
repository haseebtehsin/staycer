from rest_framework import serializers, generics
from user.models import User, Profile, Position, Schedule
from certificate.models import Certification
from project.serializer import ProjectSerializer
from rest_flex_fields import FlexFieldsModelSerializer


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'


class UserCertificationsSerializer (serializers.ModelSerializer):

    class Meta:
        model = Certification
        fields = '__all__'


class UserProfile (FlexFieldsModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'
        expandable_fields = {'position':
                             PositionSerializer}


class UserSerializer (FlexFieldsModelSerializer):
    profile = UserProfile()
    total_certifications = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'
        write_only_fields = ['password']
        expandable_fields = {
            'certifications': (UserCertificationsSerializer),
            'profile': (UserProfile)
        }

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user


class ScheduleSerializer (FlexFieldsModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'
        expandable_fields = {
            'user': UserSerializer,
            'project': ProjectSerializer,
        }
