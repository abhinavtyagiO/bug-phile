from rest_framework import viewsets, status
from rest_framework.response import Response
import requests
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from bugphile_app.api.serializers import UserSerializer
from bugphile_app.models import User
from permissions.common import IsMasterOrReadOnly
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from bugphile.settings import BASE_CONFIGURATION
from bugphile_app.auth import CsrfExemptSessionAuthentication

class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset to login or signup users.
    """

    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated & IsMasterOrReadOnly]

    @action(
        methods=['POST',],
        detail=False,
        url_name='on_login',
        url_path='on_login',
        permission_classes = [AllowAny],
        authentication_classes=(
            CsrfExemptSessionAuthentication, BasicAuthentication)
    )
    def on_login(self, request):
        client_id = BASE_CONFIGURATION['keys']['client_id']
        client_secret = BASE_CONFIGURATION['keys']['client_secret']
        redirect_uri = BASE_CONFIGURATION['keys']['redirect_uri']
        state = BASE_CONFIGURATION['keys']['state']

        try:
            auth_code = self.request.data['code']
        except KeyError:
            return Response(
                status = status.HTTP_400_BAD_REQUEST
            )
        
        recieved_state = self.request.data['state']

        if recieved_state != state:
            return Response(
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        url = 'https://oauth2.googleapis.com/token'

        data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': auth_code,
            'grant_type': 'authorization_code',
            'redirect_uri': redirect_uri,
        }

        token_data = requests.post(url=url,data=data)

        if ('error' in token_data.keys()):
            return Response(
                data=token_data['error'],
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        access_token = token_data["access_token"]
        refresh_token = token_data["refresh_token"]

        header = {
            'Authorization': 'Bearer ' + access_token
        }

        user_data = requests.get(
            url='https://www.googleapis.com/oauth2/v2/userinfo', headers=header
        )
        print(user_data)
