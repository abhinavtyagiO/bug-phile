from django.db.models import Count, Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from bugphile_app.api.serializers import IssueReadSerializer
from bugphile_app.permissions import IsMasterOrReadOnly
from bugphile_app.models import IssueStatus, Project


class ProjectIssuesView(APIView):

    permission_classes = [IsAuthenticated & IsMasterOrReadOnly]

    def get(self, request):
        project_id = self.request.GET.get('project-id', None)
        try:
            project = Project.objects.get(id=project_id)
        except:
            return Response(
                {
                    "detail": "Not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )
        issues = project.issues.all()
        serializer = IssueReadSerializer(issues, many=True)
        data = serializer.data
        return Response(
            data,
            status=status.HTTP_200_OK
        )
