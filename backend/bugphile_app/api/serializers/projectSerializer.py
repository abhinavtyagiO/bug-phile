from rest_framework import serializers
from models.project import Project

class ProjectSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()

    def get_members(self, obj):
        members_list = []
        for user in list(obj.members.all()):
            user_data = {
                'id': user.id,
                'name': user.name,
                'display_picture': user.display_picture
            }
            members_list.append(user_data)
        return members_list


    class Meta:
        model = Project
        fields = '__all__'

