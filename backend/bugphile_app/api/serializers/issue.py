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
    creator = UserSerializer()
    assignees = UserSerializer(many=True)
    project = serializers.SerializerMethodField()
    status = IssueStatusSerializer()
    priority = IssuePrioritySerializer()
    tags = IssueTagSerializer()

    def get_project(self, obj):
        data = {
            'name': obj.project.name,
            'image': obj.project.image,
        }
        return data


    class Meta:
        model = Issue
        fields = '__all__'


class IssueDetailSerializer(IssueSerializer):
    comments = CommentSerializer(many=True, source='comment', read_only=True)

    class Meta(IssueSerializer.Meta):
        fields = IssueSerializer.Meta.fields + ('comments',)
