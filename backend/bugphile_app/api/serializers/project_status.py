from rest_framework import serializers
from bugphile_app.models import ProjectStatus


class ProjectStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectStatus
        fields = '__all__'


class ProjectStatusStatsSerializer(ProjectStatusSerializer):
    num_projects = serializers.IntegerField()

    class Meta:
        model = ProjectStatusSerializer.Meta.model
        fields = '__all__'
