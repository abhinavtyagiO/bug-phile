from django.db.models import Count, Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from bugphile_app.api.serializers import UserStatsSerializer
from bugphile_app.permissions import IsMasterOrReadOnly
from bugphile_app.models import User


class UsersStatsView(APIView):

    permission_classes = [IsAuthenticated & IsMasterOrReadOnly]

    def get(self, request):
        users = User.objects.annotate(num_issues=Count('issues_reported')).order_by('-num_issues')
        serializer = UserStatsSerializer(users, many=True)
        data = serializer.data

        return Response(
            data,
            status=status.HTTP_200_OK
        )
