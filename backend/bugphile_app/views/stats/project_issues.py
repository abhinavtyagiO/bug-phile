from django.db.models import Count, Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from bugphile_app.api.serializers import IssueStatusStatsSerializer
from bugphile_app.permissions import IsMasterOrReadOnly
from bugphile_app.models import IssueStatus, Project


class ProjectIssuesStatsView(APIView):

    permission_classes = [IsAuthenticated & IsMasterOrReadOnly]

    def get(self, request):
        project_id = self.request.GET.get('project-id', None)
        if project_id is None:
            return Response(
                {
                    "detail": "Project id not provided."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            project = Project.objects.get(id=project_id)
        except:
            return Response(
                {
                    "detail": "Not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )
        num_issues = Count('issue', filter=Q(issue__project__id=project.id))
        issue_statuses = IssueStatus.objects.annotate(num_issues=num_issues)
        serializer = IssueStatusStatsSerializer(issue_statuses, many=True)
        data = serializer.data
        return Response(
            data,
            status=status.HTTP_200_OK
        )
