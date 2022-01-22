from rest_framework import serializers
from bugphile_app.models import IssuePriority

class IssuePrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = IssuePriority
        fields = '__all__'
