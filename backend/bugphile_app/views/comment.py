from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from bugphile_app.api.serializers.comment import CommentSerializer, Comment
from bugphile_app.permissions import IsMasterOrReadOnly, IsCommenter

class CommentViewSet(viewsets.ModelViewSet):
    """
    A viewset to view and post comments.
    """

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
        
    permission_classes = [IsAuthenticated & (IsCommenter | IsMasterOrReadOnly)]