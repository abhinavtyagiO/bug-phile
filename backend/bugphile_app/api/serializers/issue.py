from rest_framework import serializers
from bugphile_app.models import Issue
from bugphile_app.api.serializers import (
    UserSerializer,
    CommentSerializer,
    IssuePrioritySerializer,
    IssueStatusSerializer,
    IssueTagSerializer,
)


class IssueSerializer(serializers.ModelSerializer):
    assignee = UserSerializer(many=True)
    reporter = UserSerializer()
    project = serializers.SerializerMethodField()
    status = IssueStatusSerializer()
    priority = IssuePrioritySerializer()
    tags = IssueTagSerializer(many=True)

    def get_project(self, obj):
        data = {
            'id': obj.project.id,
            'name': obj.project.name,
            'image': obj.project.image.url,
        }
        return data

    class Meta:
        model = Issue
        fields = '__all__'


class IssueDetailSerializer(IssueSerializer):
    comments = CommentSerializer(many=True, source='comment', read_only=True)

    class Meta(IssueSerializer.Meta):
        fields = '__all__'
