from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from permissions.common import IsMasterOrReadOnly
from permissions.issue import IsIssueReporterOrReadOnly
from api.serializers import IssuePrioritySerializer
from bugphile_app.models import IssuePriority

class IssuePriorityViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and changing issue priority.
    """
    serializer_class = IssuePrioritySerializer
    queryset = IssuePriority.objects.all()
    permission_classes = [IsAuthenticated & (IsIssueReporterOrReadOnly | IsMasterOrReadOnly)]