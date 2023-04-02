from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

class Oauth2Backend(BaseBackend):
    def authenticate(self, request, client_id=None, client_secret=None, grant_type=None, **kwargs):
        User = get_user_model()
        # thực hiện xác thực thông tin đăng nhập bằng oauth2
        # trả về user nếu thông tin xác thực đúng, hoặc None nếu thông tin sai
        try:
            user = User.objects.get(email=kwargs['username'])
            if user.check_password(kwargs['password']):
                return user
        except User.DoesNotExist:
            return None
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
