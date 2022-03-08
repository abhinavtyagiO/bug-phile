from rest_framework import serializers
from bugphile_app.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'is_master',
            'avatar',
            'role',
        ]
        read_only_fields = [
            'id',
        ]

class UserStatsSerializer(UserSerializer):
    num_issues = serializers.IntegerField()

    class Meta:
        model = UserSerializer.Meta.model
        fields = '__all__'

