from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from bugphile_app.permissions import IsMasterOrReadOnly, IsIssueReporterOrReadOnly
from bugphile_app.api.serializers import IssueTagSerializer
from bugphile_app.models import IssueTag

class IssueTagViewSet(viewsets.ModelViewSet):
    """
    A viewset to viewing and changing issue tag.
    """
    serializer_class = IssueTagSerializer
    queryset = IssueTag.objects.all()
    permission_classes = [IsAuthenticated & (IsIssueReporterOrReadOnly | IsMasterOrReadOnly)]