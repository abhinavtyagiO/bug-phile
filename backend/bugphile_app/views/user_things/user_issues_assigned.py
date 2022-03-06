from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from bugphile_app.models import User
from bugphile_app.api.serializers import UserIssuesAssignedSerializer
from rest_framework import viewsets
from bugphile_app.permissions import IsMasterOrReadOnly, IsProjectCreatorOrMemberOrReadOnly


class UserIssuesAssignedViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing issues that the user are assigned for.
    """
    serializer_class = UserIssuesAssignedSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated & (
        IsMasterOrReadOnly | IsProjectCreatorOrMemberOrReadOnly)]
