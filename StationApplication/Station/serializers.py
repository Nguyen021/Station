from .models import User, Station, Route, Bus
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class UserSerializer(ModelSerializer):
    image = SerializerMethodField(source='avatar')

    def get_image(self, user):
        if user.avatar:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % user.avatar.name) if request else ''

    def create(self, validated_data):
        data = validated_data.copy()
        u = User(**data)
        u.set_password(u.password)
        u.save()
        return u

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'password', 'avatar', 'image']
        extra_kwargs = {
            'password': {'write_only': True},
            'avatar': {'write_only': True}
        }


class StationSerializer(ModelSerializer):
    class Meta:
        model = Station
        fields = ['id', 'name', 'address', 'user']


class RouteSerializer(ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'station', 'start_point', 'end_point', 'distance', 'duration']


class BusSerializer(ModelSerializer):
    class Meta:
        model = Bus
        fields = ['id', 'license', 'station', 'driver']



class ImageSerializer(ModelSerializer):
    image = SerializerMethodField(source='image')

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % obj.image.name) if request else ''
