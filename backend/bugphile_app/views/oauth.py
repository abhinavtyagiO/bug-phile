import requests
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import login, logout
from django.contrib.auth.hashers import make_password
from backend.bugphile_app.models import user
from bugphile.settings import BASE_CONFIGURATION
from bugphile_app.models import User

CLIENT_ID = BASE_CONFIGURATION['keys']['client_id']
CLIENT_SECRET = BASE_CONFIGURATION['keys']['client_secret']
REDIRECT_URI = BASE_CONFIGURATION['keys']['redirect_uri']
STATE = BASE_CONFIGURATION['keys']['state']

class OAuthView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        authorization_code = request.query_params.get('code', None)
        error = request.query_params.get('error', None)
        state = request.query_params.get('state', None)
        scope = request.query_params.get('scope', None)

        token_url = 'https://oauth2.googleapis.com/token'

        data = {
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'code': authorization_code,
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
        }

        token_data = requests.post(url=token_url, data=data)
        token_data = token_data.json()

        print("token_data", token_data)
        
        access_token = token_data.get("access_token", None)
        refresh_token = token_data.get("refresh_token", None)

        print("access_token", access_token)
        print("refresh_token", refresh_token)

        header = {
            'Authorization': 'Bearer ' + access_token
        }

        data_url = 'https://www.googleapis.com/oauth2/v2/userinfo'

        user_data = requests.get(
            url=data_url,
            headers=header
        )
        user_data = user_data.json()

        print("user_data", user_data)
        print("family name", user_data.get('family_name',{}))
        print(User.objects.get(email=user_data.get('email',{})))

        try:
            existing_user = User.objects.get(
                email=user_data.get('email',{})
            )
        except User.DoesNotExist:
            is_master = False
            email = user_data.get('email',{})
            full_name = user_data.get('name', {})
            first_name = user_data.get('given_name', {})
            last_name = user_data.get('family_name', {})
            avatar = user_data.get('picture', {})

            new_user = User(
                username = first_name.lower(),
                email = email,
                name = full_name,
                first_name = first_name,
                last_name = last_name,
                is_master = is_master,
                is_active = True,
                avatar = avatar,
                password = make_password(access_token),
                is_staff = False,
                is_superuser = False,
            )

            login(request=request, user=new_user)
            return Response(
                {'status': 'Acount created successfully.'},
                status=status.HTTP_202_ACCEPTED
            )
        

    
        return Response(
            {'status': 'User Logged-In successfully.'},
            status = status.HTTP_200_OK
        )

        @action(
        methods=['POST', ],
        detail=False,
        url_name='onlogout',
        url_path='onlogout',
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


