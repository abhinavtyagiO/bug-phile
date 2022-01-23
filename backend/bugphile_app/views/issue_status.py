from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from bugphile_app.permissions import IsMasterOrReadOnly,IsIssueReporterOrReadOnly
from bugphile_app.api.serializers import IssueStatusSerializer
from bugphile_app.models import IssueStatus

class IssueStatusViewSet(viewsets.ModelViewSet):
    """
    A viewset to viewing and changing issue status.
    """
    serializer_class = IssueStatusSerializer
    queryset = IssueStatus.objects.all()
    permission_classes = [IsAuthenticated & (IsIssueReporterOrReadOnly | IsMasterOrReadOnly)]