from rest_framework import serializers
from bugphile_app.api.serializers import IssueReadSerializer
from bugphile_app.models import User

class UserIssuesReportedSerializer(serializers.ModelSerializer):
    issues_reported = IssueReadSerializer(many=True)

    class Meta:
        model = User
        fields = ['issues_reported']