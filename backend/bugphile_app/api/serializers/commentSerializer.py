from django.core import serializers
from django.core.serializers import serialize
from django.db.models import fields
from rest_framework import serializers
from models.comment import Comment

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'