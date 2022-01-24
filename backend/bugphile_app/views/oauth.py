import requests
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny 
from bugphile.settings import BASE_CONFIGURATION

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

        # try:
        #     existing_user = User.objects.get(
        #         email=user_data.get('email')
        #     )
        
        return Response(
            status = status.HTTP_200_OK
        )


