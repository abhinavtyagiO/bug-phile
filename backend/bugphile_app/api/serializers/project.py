from rest_framework import serializers
from bugphile_app.models import Project
from bugphile_app.api.serializers import ProjectStatusSerializer, UserSerializer


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['creator']


class ProjectReadSerializer(ProjectSerializer):
    members = serializers.SerializerMethodField()
    status = ProjectStatusSerializer()
    creator = UserSerializer()
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
