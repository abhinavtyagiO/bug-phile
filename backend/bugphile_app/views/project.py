from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from bugphile_app.api.serializers.project import ProjectReadSerializer, ProjectSerializer, Project
from rest_framework import viewsets
from bugphile_app.permissions import IsMasterOrReadOnly, IsProjectCreatorOrMemberOrReadOnly


class ProjectViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and creating projects.
    """
    parser_classes = (MultiPartParser, FormParser)
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated & (
        IsMasterOrReadOnly | IsProjectCreatorOrMemberOrReadOnly)]

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectReadSerializer
        return ProjectSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
