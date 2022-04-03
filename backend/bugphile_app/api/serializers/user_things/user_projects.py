from rest_framework import serializers
from bugphile_app.api.serializers import ProjectReadSerializer
from bugphile_app.models import User

class UserProjectsSerializer(serializers.ModelSerializer):
    projects = ProjectReadSerializer(many=True)

    class Meta:
        model = User
        fields = ['projects']