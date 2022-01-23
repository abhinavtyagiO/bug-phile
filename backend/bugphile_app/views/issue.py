from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from bugphile_app.permissions import IsMasterOrReadOnly, IsIssueReporterOrReadOnly
from bugphile_app.api.serializers.issue import IssueSerializer, Issue

class IssueViewSet(viewsets.ModelViewSet):
    """
    A viewset to viewing and reporting an issue.
    """
    serializer_class = IssueSerializer
    queryset = Issue.objects.all()
    permission_classes = [IsAuthenticated & (IsIssueReporterOrReadOnly | IsMasterOrReadOnly)]