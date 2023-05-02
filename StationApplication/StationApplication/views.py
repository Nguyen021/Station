import secrets
from datetime import datetime, timedelta

from django.conf import settings
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from oauth2_provider.models import AccessToken, RefreshToken
from oauth2_provider.views import RevokeTokenView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from oauth2_provider.views.generic import ProtectedResourceView


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



class LogoutView(RevokeTokenView):
    pass

# @api_view(['POST'])
# def logout(request):
#     request._request.POST = request.POST.copy()
#     request._request.POST['token'] = request.auth.token
#     response = LogoutView.as_view()(request._request)
#     return Response({'message': 'Đăng xuất thành công.'})