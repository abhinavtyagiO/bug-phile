from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from bugphile_app.api.serializers import CommentSerializer
from bugphile_app.permissions import IsMasterOrReadOnly
from bugphile_app.models import Issue


class IssueCommentsView(APIView):

    permission_classes = [IsAuthenticated & IsMasterOrReadOnly]

    def get(self, request):
        issue_id = self.request.GET.get('issue-id', None)
        try:
            issue = Issue.objects.get(id=issue_id)
        except:
            return Response(
                {
                    "detail": "Not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )
        comments = issue.comments.all()
        serializer = CommentSerializer(comments, many=True)
        data = serializer.data
        return Response(
            data,
            status=status.HTTP_200_OK
        )
