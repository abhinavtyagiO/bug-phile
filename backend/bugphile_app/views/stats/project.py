from django.db.models import Count, Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from bugphile_app.api.serializers import ProjectStatusStatsSerializer
from bugphile_app.permissions import IsMasterOrReadOnly
from bugphile_app.models import ProjectStatus


class ProjectStatsView(APIView):

    permission_classes = [IsAuthenticated & IsMasterOrReadOnly]

    def get(self, request):
        num_projects = Count('project')
        project_statuses = ProjectStatus.objects.annotate(num_projects=num_projects)
        serializer = ProjectStatusStatsSerializer(project_statuses, many=True)
        data = serializer.data
        return Response(
            data,
            status=status.HTTP_200_OK
        )
