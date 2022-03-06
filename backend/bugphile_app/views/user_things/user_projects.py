from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from bugphile_app.models import User
from bugphile_app.api.serializers import UserProjectsSerializer
from rest_framework import viewsets
from bugphile_app.permissions import IsMasterOrReadOnly, IsProjectCreatorOrMemberOrReadOnly


class UserProjectsViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing user's projects.
    """
    serializer_class = UserProjectsSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated & (
        IsMasterOrReadOnly | IsProjectCreatorOrMemberOrReadOnly)]
