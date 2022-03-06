from rest_framework import serializers
from bugphile_app.api.serializers import IssueSerializer
from bugphile_app.models import User

class UserIssuesAssignedSerializer(serializers.ModelSerializer):
    issues_assigned = IssueSerializer(many=True)

    class Meta:
        model = User
        fields = ['issues_assigned']