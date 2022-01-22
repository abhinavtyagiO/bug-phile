from rest_framework import serializers
from bugphile_app.models import IssueStatus

class IssueStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueStatus
        fields = '__all__'
