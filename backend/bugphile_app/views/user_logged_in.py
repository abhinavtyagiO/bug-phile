from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated 
from rest_framework.authentication import SessionAuthentication
from bugphile_app.api.serializers import UserSerializer
from bugphile_app.models import User

class UserLoggedInViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, ]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
