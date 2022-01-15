from django.contrib.auth.models import User
from django.db.models import fields
from rest_framework import serializers
from models.issue import Issue
from serializers.user import UserSerializer
from serializers.comment import CommentSerializer

class IssueSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    assignees = UserSerializer(many=True)
    project = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    priority = serializers.SerializerMethodField()

    def get_project(self, obj):
        data = {
            'name': obj.project.name,
            'image': obj.project.image,
        }
        return data

    def get_status(self, obj):
        data = {
            'text': obj.status.text,
            'color': obj.status.color,
        }
        return data

    def get_priority(self, obj):
        data = {
            'text': obj.priority.text,
            'color': obj.priority.color,
        }
        return data


    class Meta:
        model = Issue
        fields = '__all__'


class IssueDetailSerializer(IssueSerializer):
    comments = CommentSerializer(many=True, source='comment', read_only=True)

    class Meta(IssueSerializer.Meta):
        fields = IssueSerializer.Meta.fields + ('comments',)
