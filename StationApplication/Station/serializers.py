from .models import User, Station, Route, Bus, Trip, Delivery, Booking, Comment
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class UserSerializer(ModelSerializer):
    image = SerializerMethodField(source='image')

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
        fields = ['id', 'first_name', 'last_name', 'username', 'password', 'image', 'email', 'phone_number']
        extra_kwargs = {
            'password': {'write_only': True},
            'avatar': {'write_only': True}
        }


class StationSerializer(ModelSerializer):
    user = SerializerMethodField()
    rate = SerializerMethodField()

    def get_rate(self, station):
        request = self.context.get('request')
        if request:
            r = station.rating_set.filter(user=request.user).first()
            return r.rate if r else 0

    def get_user(self, station):
        user = station.user
        if user:
            return {
                'id': user.id,
                'username': user.username,
                'firstname': user.first_name,
                'lastname': user.last_name,
                'email': user.email
            }
        return None

    class Meta:
        model = Station
        fields = ['id', 'name', 'address', 'user', 'rate', 'active']


class RouteSerializer(ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'station', 'start_point', 'end_point', 'distance', 'duration']


class BusSerializer(ModelSerializer):
    class Meta:
        model = Bus
        fields = ['id', 'license', 'station', 'driver']


class CommentSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'user']


class TripSerializer(ModelSerializer):
    bus = SerializerMethodField()
    route = SerializerMethodField()
    station = SerializerMethodField()
    image = SerializerMethodField(source='image')

    def get_bus(self, Trip):
        bus = Trip.bus
        return BusSerializer(bus, context=self.context).data

    def get_station(self, Trip):
        station = Trip.station
        return StationSerializer(station, context=self.context).data

    def get_route(self, Trip):
        route = Trip.route
        return RouteSerializer(route, context=self.context).data

    def get_image(self, Trip):
        if Trip.image:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % Trip.image.name) if request else ''

    class Meta:
        model = Trip
        fields = ['id', 'start_time', 'end_time', 'price', 'image', 'bus', 'station', 'route', 'available_seats',
                  'total_seats']


class DeliverySerializer(ModelSerializer):
    trip = TripSerializer()

    class Meta:
        model = Delivery
        fields = ['id', 'sender_name', 'sender_address', 'sender_phone',
                  'receiver_name', 'receiver_address', 'receiver_phone',
                  'weight', 'trip']


class BookingSerializer(ModelSerializer):
    trip = TripSerializer()
    user = SerializerMethodField()

    def get_user(self, station):
        user = station.user
        if user:
            return {
                'id': user.id,
                'username': user.username,
                'firstname': user.first_name,
                'lastname': user.last_name,
                'email': user.email
            }
        return None

    class Meta:
        model = Booking
        fields = ['id', 'number_of_seats',
                  'payment_method', 'payment_status', 'booking_time',
                  'user', 'trip', 'total_price']


class ImageSerializer(ModelSerializer):
    image = SerializerMethodField(source='image')

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri('/static/%s' % obj.image.name) if request else ''
