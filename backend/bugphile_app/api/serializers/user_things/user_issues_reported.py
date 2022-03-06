from rest_framework import serializers
from bugphile_app.api.serializers import IssueSerializer
from bugphile_app.models import User

class UserIssuesReportedSerializer(serializers.ModelSerializer):
    issues_reported = IssueSerializer(many=True)

    class Meta:
        model = User
        fields = ['issues_reported']