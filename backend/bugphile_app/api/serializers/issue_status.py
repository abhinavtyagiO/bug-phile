from rest_framework import serializers
from bugphile_app.models import IssueStatus


class IssueStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueStatus
        fields = '__all__'


class IssueStatusStatsSerializer(IssueStatusSerializer):
    num_issues = serializers.IntegerField()

    class Meta:
        model = IssueStatusSerializer.Meta.model
        fields = '__all__'
