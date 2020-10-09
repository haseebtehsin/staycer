from rest_framework import serializers
from user.models import User
from django.contrib.auth import authenticate


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active and user.role == User.HUMAN_RESOURCE:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
