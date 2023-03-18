from .models import User, Station, Route
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']


class StationSerializer(ModelSerializer):
    class Meta:
        model = Station
        fields = ['id', 'name', 'address', 'user']

class RouteSerializer (ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'station', 'start_point', 'end_point', 'distance', 'duration']
