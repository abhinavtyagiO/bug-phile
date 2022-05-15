from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from bugphile_app.models import Project
from bugphile_app.api.serializers import ProjectReadSerializer


class SearchProjectView(APIView):

    def get(self, request):
        project = self.request.GET.get('project', None)

        query = Q(name__icontains=project)

        if project is not None:
            projects = Project.objects.filter(query)
        else:
            projects = Project.objects.none()

        serializer = ProjectReadSerializer(projects, many=True)
        data = serializer.data
        return Response(
            data,
            status=status.HTTP_200_OK
        )
