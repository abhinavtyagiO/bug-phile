from rest_framework import serializers
from bugphile_app.api.serializers import ProjectSerializer
from bugphile_app.models import User

class UserProjectsSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True)

    class Meta:
        model = User
        fields = ['projects']