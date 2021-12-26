from django.core import serializers
from django.core.serializers import serialize
from rest_framework import serializers
from models.project import Project, ProjectStatus

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

