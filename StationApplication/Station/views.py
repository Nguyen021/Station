import datetime

from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.views import View
from rest_framework import viewsets, parsers, generics, permissions
from rest_framework.decorators import action, permission_classes, api_view
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from django.db import transaction
from datetime import datetime as date
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import User, Station, Route, Bus, Trip, Delivery, Booking, Comment, Rating
from .pagination import StandardResultsSetPagination
from .perms import CommentOwner, IsStation
from .serializers import UserSerializer, StationSerializer, RouteSerializer, BusSerializer, TripSerializer, \
    DeliverySerializer, BookingSerializer, CommentSerializer, ListStationSerializer, StationUserSerializer


def index(request):
    return HttpResponse("My Application for Station")


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get_permissions(self):
        if self.action in ['current_user']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'put'], detail=False, url_path='current-user')
    def current_user(self, request):
        u = request.user
        if request.method.__eq__('PUT'):
            for k, v in request.data.items():
                setattr(u, k, v)
            u.save()

        return Response(UserSerializer(u, context={'request': request}).data)


class ListUserViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    pagination_class = StandardResultsSetPagination


class StationViewSet(viewsets.ViewSet, generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Station.objects.filter(active=True)
    serializer_class = StationSerializer
    pagination_class = StandardResultsSetPagination

    def create(self, request):
        user = request.user
        data = request.data
        serializer = StationSerializer(data=data)
        if user.is_station != 1:
            return Response(data={"message": "No permission"}, status=status.HTTP_403_FORBIDDEN)
        if serializer.is_valid():
            station = serializer.save(user=user)
            return Response(StationSerializer(station).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True, url_path='routes')
    def routes(self, request, pk):
        c = self.get_object()  # Course.query.get(pk=pk)
        routes = c.route_set.filter(active=True)

        return Response(RouteSerializer(routes, many=True, context={'request': request}).data)

    @action(methods=['get'], detail=True, url_path='trip')
    def trips(self, request, pk):
        c = self.get_object()  # Course.query.get(pk=pk)
        routes = c.trip_set.filter(active=True)

        return Response(TripSerializer(routes, many=True, context={'request': request}).data)

    @action(methods=['get'], detail=True, url_path='bus')
    def bus(self, request, pk):
        user = request.user
        if user.is_station != 1:
            return Response(status=status.HTTP_403_FORBIDDEN)
        c = self.get_object()  # Course.query.get(pk=pk)
        bus = c.bus_station.filter(active=True)

        return Response(BusSerializer(bus, many=True, context={'request': request}).data)

    @action(methods=['post'], detail=True, url_path='comments')
    def comments(self, request, pk):
        c = Comment(content=request.data['content'], station=self.get_object(), user=request.user)
        c.save()
        return Response(CommentSerializer(c, context={'request': request}).data, status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=True, url_path='list-comments')
    def list_comments(self, request, pk):
        s = self.get_object()
        comment = s.comment_station.all()

        return Response(CommentSerializer(comment, many=True, context={'request': request}).data)

    @action(methods=['post'], detail=True, url_path='rating')
    def rating(self, request, pk):
        r, _ = Rating.objects.get_or_create(station=self.get_object(), user=request.user)
        r.rate = request.data['rating']
        r.save()

        return Response(status=status.HTTP_200_OK)


class RouteViewSet(viewsets.ViewSet, generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Route.objects.filter(active=True)
    serializer_class = RouteSerializer
    pagination_class = StandardResultsSetPagination

    @action(methods=['get'], detail=False, url_path='list-start-end-points')
    def get_list_start_end_point(self, request):
        routes = Route.objects.all()
        start_points = set([route.start_point for route in routes])
        end_points = set([route.end_point for route in routes])
        data = {
            'start_points': start_points,
            'end_points': end_points
        }
        return Response(data)


class BusViewSet(viewsets.ViewSet, generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Bus.objects.filter(active=True)
    serializer_class = BusSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsStation]


class TripViewSet(viewsets.ViewSet, generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.filter(active=True)
    serializer_class = TripSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        start_point = self.request.query_params.get('start_point', None)
        end_point = self.request.query_params.get('end_point', None)
        start_time = self.request.query_params.get('start_time', None)

        trips = Trip.objects.all()

        if start_point:
            trips = trips.filter(route__start_point__icontains=start_point)
        if end_point:
            trips = trips.filter(route__end_point__icontains=end_point)
        if start_time:
            trips = trips.filter(start_time__=start_time)

        return trips

    def create(self, request, *args, **kwargs):
        user = request.user
        if user.is_station != 1:
            return Response(data={"message": "No permission"},status=status.HTTP_403_FORBIDDEN)
        route_id = request.data.get('route_id')
        bus_id = request.data.get('bus_id')
        station_id = request.data.get('station_id')

        try:
            route = Route.objects.get(id=route_id)
        except Route.DoesNotExist:
            return Response({'error': 'Invalid Route ID'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            bus = Bus.objects.get(id=bus_id)
        except Bus.DoesNotExist:
            return Response({'error': 'Invalid Bus ID'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            station = Station.objects.get(id=station_id)
        except Station.DoesNotExist:
            return Response({'error': 'Invalid Station ID'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Save the trip object with the related route, bus, and station
        trip = serializer.save(route=route, bus=bus, station=station)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        user = request.user
        if user.is_station != 1:
            return Response(data={"message": "No permission"}, status=status.HTTP_403_FORBIDDEN)
        route_id = request.data.get('route_id')
        bus_id = request.data.get('bus_id')
        station_id = request.data.get('station_id')

        try:
            route = Route.objects.get(id=route_id)
        except Route.DoesNotExist:
            return Response({'error': 'Route ID không hợp lệ'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            bus = Bus.objects.get(id=bus_id)
        except Bus.DoesNotExist:
            return Response({'error': 'Bus ID không hợp lệ'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            station = Station.objects.get(id=station_id)
        except Station.DoesNotExist:
            return Response({'error': 'Station ID không hợp lệ'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_object()
        serializer.is_valid(raise_exception=True)

        # Save the trip object with the related route, bus, and station
        trip = serializer.save(route=route, bus=bus, station=station)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.action in ['assign_tag', 'comments', 'like', 'rating']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=True, url_path='list-comments')
    def list_comments(self, request, pk):
        c = self.get_object()
        comment = c.comment_trip.all()

        return Response(CommentSerializer(comment, many=True, context={'request': request}).data)

    @action(methods=['post'], detail=True, url_path='comments')
    def comments(self, request, pk):
        c = Comment(content=request.data['content'], trip=self.get_object(), user=request.user)
        c.save()
        return Response(CommentSerializer(c, context={'request': request}).data, status=status.HTTP_201_CREATED)

    @action(methods=['delete'], detail=True, url_path='comments/(?P<comment_id>[^/.]+)')
    def delete_comment(self, request, pk, comment_id):
        trip = self.get_object()
        try:
            comment = Comment.objects.get(id=comment_id, trip=trip)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.user != comment.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DeliveryViewSet(viewsets.ViewSet, generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Delivery.objects.filter(active=True)
    serializer_class = DeliverySerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]


class TripSearchViewSet(viewsets.ViewSet, generics.ListAPIView):
    serializer_class = TripSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        start_point = self.request.query_params.get('start_point', None)
        end_point = self.request.query_params.get('end_point', None)
        start_time = self.request.query_params.get('start_time', None)

        trips = Trip.objects.all()

        if start_point:
            trips = trips.filter(route__start_point__icontains=start_point)
        if end_point:
            trips = trips.filter(route__end_point__icontains=end_point)
        if start_time:
            trips = trips.filter(start_time__icontains=start_time)

        return trips


class BookingCreate(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic()
    def create(self, request, *args, **kwargs):
        # Lấy id của chuyến đi từ yêu cầu
        trip_id = request.data.get('trip_id')

        # chọn loại thanh toán
        payment_method = request.data.get('payment_method')

        # Lấy số lượng vé từ yêu cầu
        number_of_seats = request.data.get('number_of_seats')

        # Kiểm tra xem số lượng vé có khả dụng không
        trip = Trip.objects.get(pk=trip_id)
        if trip.available_seats < number_of_seats:
            return Response({'message': 'Số lượng vé không khả dụng'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Tính tổng tiền giá tiền
        total_price = trip.price * number_of_seats

        # Tạo một đối tượng booking
        booking = Booking(trip=trip, user=request.user, payment_method=payment_method, payment_status=1,
                          total_price=total_price, number_of_seats=number_of_seats, booking_time=datetime.datetime.now()
                          )

        # Cập nhật số lượng vé còn lại của chuyến đi
        trip.available_seats -= number_of_seats
        trip.save()

        # Lưu đối tượng booking vào cơ sở dữ liệu
        booking.save()

        # Trả về thông tin đặt vé thành công
        serializer = self.get_serializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class BookingList(viewsets.ViewSet, generics.ListAPIView):
    serializer_class = BookingSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Lấy danh sách các booking của người dùng hiện tại
        return Booking.objects.filter(user=self.request.user)


class TripCompareView(APIView):
    def get(self, request, route_id):
        trips = Trip.objects.filter(route=route_id, active=True)
        trip_info = []
        for trip in trips:
            trip_data = {
                'trip_id': trip.id,
                'start_time': trip.start_time,
                'end_time': trip.end_time,
                'price': trip.price,
                'available_seats': trip.available_seats,
            }
            trip_info.append(trip_data)
        return Response(trip_info)


class UnactiveStation(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, station_id):
        try:
            user = request.user
            if user.is_station != 1:
                return Response(data={"message": "No permission"}, status=status.HTTP_403_FORBIDDEN)
            station = Station.objects.get(pk=station_id)
        except Station.DoesNotExist:
            return Response({'error': 'Station not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = StationSerializer(station, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListStationView(viewsets.ViewSet, generics.ListAPIView):
    queryset = Station.objects.filter(active=True)
    serializer_class = StationSerializer
    pagination_class = StandardResultsSetPagination


class RevenueReportView(View):
    permission_classes = [IsStation]

    def get(self, request, station_id, *args, **kwargs):
        start_date_str = request.GET.get('start_date', None)
        end_date_str = request.GET.get('end_date', None)

        if start_date_str is None or end_date_str is None:
            return JsonResponse({'error': 'Missing start_date or end_date parameter.'})

        start_date = date.strptime(start_date_str, '%Y-%m-%d')
        end_date = date.strptime(end_date_str, '%Y-%m-%d')

        station = Station.objects.get(pk=station_id)

        bookings = Booking.objects.filter(
            Q(trip__station=station) &
            Q(payment_status=1) &
            Q(booking_time__range=(start_date, end_date))
        )

        total_revenue_by_month = {}
        total_revenue_by_quarter = {}
        total_revenue_by_year = {}

        for booking in bookings:
            booking_month = booking.booking_time.month
            booking_quarter = (booking_month - 1) // 3 + 1
            booking_year = booking.booking_time.year

            if booking_year not in total_revenue_by_year:
                total_revenue_by_year[booking_year] = 0

            if booking_quarter not in total_revenue_by_quarter:
                total_revenue_by_quarter[booking_quarter] = 0

            if booking_month not in total_revenue_by_month:
                total_revenue_by_month[booking_month] = 0

            total_revenue_by_year[booking_year] += booking.total_price
            total_revenue_by_quarter[booking_quarter] += booking.total_price
            total_revenue_by_month[booking_month] += booking.total_price

        result = {
            'total_revenue_by_month': total_revenue_by_month,
            'total_revenue_by_quarter': total_revenue_by_quarter,
            'total_revenue_by_year': total_revenue_by_year,
        }

        return JsonResponse(result)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.filter(active=True)
    serializer_class = CommentSerializer
    permission_classes = [CommentOwner]


def get_trips_by_station_and_route(station_id, route_id):
    station = get_object_or_404(Station, pk=station_id)
    route = get_object_or_404(Route, pk=route_id, station=station)

    return Trip.objects.filter(route=route, station=station)


def get_bookings_by_trips(trips):
    return Booking.objects.filter(trip__in=trips)


def get_booking_stats_by_trips(bookings, trips):
    stats = []
    for trip in trips:
        count = bookings.filter(trip=trip).count()
        stats.append({
            'trip_id': trip.id,
            'start_time': trip.start_time,
            'end_time': trip.end_time,
            'price': trip.price,
            'available_seats': trip.available_seats,
            'booked_seats': count,
            'percent_booked_seats': count / trip.available_seats * 100 if trip.available_seats > 0 else 0,
        })
    return stats


@api_view(['GET'])
def booking_stats_by_station_and_route(request, station_id, route_id):
    trips = get_trips_by_station_and_route(station_id, route_id)
    bookings = get_bookings_by_trips(trips)
    stats = get_booking_stats_by_trips(bookings, trips)
    bookings_count = len(stats)

    return Response(data={
        'booking_stats': stats,
        "total": bookings_count
    })