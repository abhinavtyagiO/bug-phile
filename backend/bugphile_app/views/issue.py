from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from bugphile_app.permissions import IsMasterOrReadOnly, IsIssueReporterOrReadOnly
from bugphile_app.api.serializers.issue import IssueSerializer, Issue, IssueReadSerializer


class IssueViewSet(viewsets.ModelViewSet):
    """
    A viewset to viewing and reporting an issue.
    """
    parser_classes = (MultiPartParser, FormParser)
    queryset = Issue.objects.all()
    permission_classes = [IsAuthenticated & (
        IsIssueReporterOrReadOnly | IsMasterOrReadOnly)]

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return IssueReadSerializer
        return IssueSerializer

    def perform_create(self, serializer):
        print("heelo")
        serializer.save(reporter=self.request.user)
