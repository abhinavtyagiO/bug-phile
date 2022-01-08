from django.core import serializers
from django.core.serializers import serialize
from django.db.models import fields
from rest_framework import serializers
from models.comment import Comment

class IssueSerializer(serializers.ModelSerializer):
    
    commenter_details = serializers.SerializerMethodField('commenterDetails')
    issue_details = serializers.SerializerMethodField('issueDetails')

    def commentorDetails(self, obj):
        details = {
            'id': obj.commenter.id,
            'name': obj.commenter.name
        }


    class Meta:
        model = Comment
        fields = '__all__'