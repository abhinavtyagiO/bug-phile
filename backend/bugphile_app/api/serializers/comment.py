from rest_framework import serializers
from bugphile_app.models import Comment

class CommentSerializer(serializers.ModelSerializer):
    
    commenter_details = serializers.SerializerMethodField()

    def get_commenter_details(self, obj):
        role = ''

        if obj.commenter in obj.issue.project.members:
            role = 'Project Member'
        if obj.commenter == obj.issue.assignee:
            role = 'Assignee'
        if obj.commenter == obj.issue.reporter:
            role = 'Reporter'
            

        data = {
            'id': obj.commenter.id,
            'name': obj.commenter.name,
            'avatar': obj.commenter.avatar,
            'role': role
        }
        return data

    class Meta:
        model = Comment
        fields = '__all__'
