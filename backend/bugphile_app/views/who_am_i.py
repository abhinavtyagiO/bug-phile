from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from bugphile_app.api.serializers import UserSerializer


class WhoAmIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = self.request.user
        serializer = UserSerializer(user)
        data = serializer.data

        return Response(
            data,
            status=status.HTTP_200_OK
        )
