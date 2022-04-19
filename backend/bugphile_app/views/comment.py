from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from bugphile_app.api.serializers.comment import CommentSerializer, Comment, CommentReadSerializer
from bugphile_app.permissions import IsMasterOrReadOnly, IsCommenter


class CommentViewSet(viewsets.ModelViewSet):
    """
    A viewset to view and post comments.
    """

    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated & (IsCommenter | IsMasterOrReadOnly)]

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return CommentReadSerializer
        return CommentSerializer

    def perform_create(self, serializer):
        serializer.save(commenter=self.request.user)
