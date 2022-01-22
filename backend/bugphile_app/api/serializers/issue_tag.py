from rest_framework import serializers
from bugphile_app.models import IssueTag

class IssueTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueTag
        fields = '__all__'
