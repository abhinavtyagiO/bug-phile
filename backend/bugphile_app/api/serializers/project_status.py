from rest_framework import serializers
from bugphile_app.models import ProjectStatus

class ProjectStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectStatus
        fields = '__all__'
