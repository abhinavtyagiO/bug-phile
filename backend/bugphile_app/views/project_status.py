from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from bugphile_app.permissions import IsMasterOrReadOnly, IsIssueReporterOrReadOnly
from bugphile_app.api.serializers import ProjectStatusSerializer
from bugphile_app.models import ProjectStatus

class ProjectStatusViewSet(viewsets.ModelViewSet):
    """
    A viewset to viewing and changing project status.
    """
    serializer_class = ProjectStatusSerializer
    queryset = ProjectStatus.objects.all()
    permission_classes = [IsAuthenticated & (IsIssueReporterOrReadOnly | IsMasterOrReadOnly)]