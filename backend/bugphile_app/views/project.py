from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from bugphile_app.api.serializers.project import ProjectSerializer, Project
from rest_framework import viewsets
from bugphile_app.permissions import IsMasterOrReadOnly, IsProjectCreatorOrMemberOrReadOnly

class ProjectViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and creating projects.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated & (IsMasterOrReadOnly | IsProjectCreatorOrMemberOrReadOnly)]

