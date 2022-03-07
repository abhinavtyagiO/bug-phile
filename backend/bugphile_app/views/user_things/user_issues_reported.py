from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from bugphile_app.models import User
from bugphile_app.api.serializers import UserIssuesReportedSerializer
from rest_framework import viewsets
from bugphile_app.permissions import IsMasterOrReadOnly, IsProjectCreatorOrMemberOrReadOnly


class UserIssuesReportedViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A ViewSet for viewing issues the user has reported.
    """
    serializer_class = UserIssuesReportedSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated & (
        IsMasterOrReadOnly | IsProjectCreatorOrMemberOrReadOnly)]
