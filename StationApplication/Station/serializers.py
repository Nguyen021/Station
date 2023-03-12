from .models import User, Station
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']


class StationSerializer(ModelSerializer):
    class Meta:
        model = Station
        fields = ('id', 'name', 'address', 'phone', 'email', 'description', 'is_approved')