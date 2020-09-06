from rest_framework import serializers
from register.models import User, Company, Address


class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
