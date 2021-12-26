from django.core import serializers
from django.core.serializers import serialize
from django.db.models import fields
from rest_framework import serializers
from models.issue import Issue

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'