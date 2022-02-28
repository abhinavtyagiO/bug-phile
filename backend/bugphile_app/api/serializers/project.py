from rest_framework import serializers
from bugphile_app.models import Project
from bugphile_app.api.serializers import ProjectStatusSerializer

class ProjectSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    status = ProjectStatusSerializer()
    # image = serializers.SerializerMethodField()

    def get_members(self, obj):
        members_list = []
        for user in list(obj.members.all()):
            user_data = {
                'id': user.id,
                'name': user.name,
                'avatar': user.avatar.url
            }
            members_list.append(user_data)
        return members_list

    # def get_image(self, obj):
    #     url = obj.image.url
    #     return url


    class Meta:
        model = Project
        fields = '__all__'

