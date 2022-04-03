from rest_framework import serializers
from bugphile_app.api.serializers import IssueReadSerializer
from bugphile_app.models import User

class UserIssuesAssignedSerializer(serializers.ModelSerializer):
    issues_assigned = IssueReadSerializer(many=True)

    class Meta:
        model = User
        fields = ['issues_assigned']