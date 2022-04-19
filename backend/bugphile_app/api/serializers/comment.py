from rest_framework import serializers
from bugphile_app.api.serializers.user import UserSerializer
from bugphile_app.models import Comment


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ["commenter"]


class CommentReadSerializer(CommentSerializer):
    commenter = UserSerializer()
    commenter_details = serializers.SerializerMethodField()

    def get_commenter_details(self, obj):
        type = ''

        if obj.issue.project.members.filter(id=obj.commenter.id).exists():
            type = 'Project Member'
        if obj.issue.assignee.filter(id=obj.commenter.id).exists():
            type = 'Assignee'
        if obj.commenter.id == obj.issue.reporter.id:
            type = 'Reporter'

        data = {
            'id': obj.commenter.id,
            'name': obj.commenter.name,
            'avatar': obj.commenter.avatar.url,
            'type': type
        }
        return data
