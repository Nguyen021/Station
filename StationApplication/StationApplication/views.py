from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from oauth2_provider.models import AccessToken
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
import secrets


@csrf_exempt
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    client_id = getattr(settings, "CLIENT_ID")
    client_secret = getattr(settings, "CLIENT_SECRET")
    grant_type = getattr(settings, "GRANT_TYPE")

    user = authenticate(username=username, password=password, client_id=client_id,
                        client_secret=client_secret, grant_type=grant_type)
    if user is not None:
        access_token = AccessToken.objects.create(user=user, expires=datetime.now() + timedelta(days=30),
                                                  token=secrets.token_hex(16))
        return Response({'access_token': access_token.token})
    else:
        return Response({'error': "Đăng nhập thất bại"}, status=401)
