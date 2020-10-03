from rest_framework import serializers
from project.models import Project


class ProjectSerializer (serializers.ModelSerializer):
    total_scheduled = serializers.IntegerField(read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
