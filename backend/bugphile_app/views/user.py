import uuid
from rest_framework import viewsets, status
from rest_framework.response import Response
import requests
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import login, logout
from django.contrib.auth.hashers import make_password
from bugphile_app.api.serializers import UserSerializer
from bugphile_app.models import User
from bugphile_app.permissions import IsMasterOrReadOnly
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
        methods=['POST', ],
        detail=False,
        url_name='on_login',
        url_path='on_login',
        permission_classes=[AllowAny],
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
                status=status.HTTP_400_BAD_REQUEST
            )

        recieved_state = self.request.data['state']

        if recieved_state != state:
            return Response(
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        url = 'https://oauth2.googleapis.com/token'

        data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': auth_code,
            'grant_type': 'authorization_code',
            'redirect_uri': redirect_uri,
        }

        print('data', data)

        token_data = requests.post(url=url, data=data).json()

        print('token_data', token_data)

        if ('error' in token_data.keys()):
            return Response(
                data=token_data['error'],
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        access_token = token_data["access_token"]
        # refresh_token = token_data["refresh_token"]

        header = {
            'Authorization': 'Bearer ' + access_token
        }

        user_data = requests.get(
            url='https://www.googleapis.com/oauth2/v2/userinfo', headers=header
        )
        user_data = user_data.json()

        print("user_data", user_data)
        print("family name", user_data.get('family_name', {}))

        try:
            existing_user = User.objects.get(
                email=user_data.get('email', {})
            )
        except:
            is_master = False
            email = user_data.get('email', {})
            full_name = user_data.get('name', {})
            first_name = user_data.get('given_name', {})
            last_name = user_data.get('family_name', {})
            avatar = user_data.get('picture', {})

            new_user = User(
                username=str(uuid.uuid4()),
                email=email,
                name=full_name,
                first_name=first_name,
                last_name=last_name,
                is_master=is_master,
                is_active=True,
                avatar=avatar,
                password=make_password(access_token),
                is_staff=False,
                is_superuser=False,
            )

            new_user.save()

            login(request=request, user=new_user)
            return Response(
                {'status': 'Account created successfully.'},
                status=status.HTTP_202_ACCEPTED
            )

        login(request=request, user=existing_user)
        return Response(
            {'status': 'User Logged-In successfully.'},
            status=status.HTTP_200_OK
        )

    @action(
        methods=['POST', ],
        detail=False,
        url_name='on_logout',
        url_path='on_logout',
        permission_classes=[IsAuthenticated],
        authentication_classes=(SessionAuthentication,)
    )
    def on_logout(self, request):
        logout(request)
        return Response(
            {
                'message': 'User has been Logged Out.',
            },
            status=status.HTTP_200_OK
        )
