from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from api.serializers.comment import CommentSerializer, Comment
from permissions.common import IsMasterOrReadOnly
from permissions.comment import IsCommenterOrPostPermissions

class CommentViewset(viewsets.ModelViewSet):
    """
    A viewset to view and post comments.
    """

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated & (IsCommenterOrPostPermissions | IsMasterOrReadOnly)]