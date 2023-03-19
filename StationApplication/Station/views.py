from django.http import HttpResponse
from rest_framework import viewsets, parsers, generics, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import User, Station, Route, Bus
from .serializers import UserSerializer, StationSerializer, RouteSerializer, BusSerializer


def index(request):
    return HttpResponse("My Application for Station")


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [parsers.MultiPartParser, ]

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


class StationViewSet(viewsets.ViewSet, generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Station.objects.filter(active=True)
    serializer_class = StationSerializer

    @action(methods=['get'], detail=True, url_path='routes')
    def routes(self, request, pk):
        c = self.get_object()  # Course.query.get(pk=pk)
        routes = c.route_set.filter(active=True)

        return Response(RouteSerializer(routes, many=True, context={'request': request}).data)

    @action(methods=['get'], detail=True, url_path='bus')
    def routes(self, request, pk):
        c = self.get_object()  # Course.query.get(pk=pk)
        bus = c.bus_station.filter(active=True)

        return Response(BusSerializer(bus, many=True, context={'request': request}).data)


class RouteViewSet(viewsets.ViewSet, generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Route.objects.filter(active=True)
    serializer_class = RouteSerializer


class BusViewSet(viewsets.ViewSet, generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Bus.objects.filter(active=True)
    serializer_class = BusSerializer

    # @api_view(['GET', 'POST'])
    # def nha_xe_list(request):
    #     """
    #     List all NhaXe, or create a new NhaXe.
    #     """
    #     if request.method == 'GET':
    #         station = Station.objects.all()
    #         serializer = StationSerializer(station , many=True)
    #         return Response(serializer.data)
    #
    #     elif request.method == 'POST':
    #         serializer = StationSerializer(data=request.data)
    #         if serializer.is_valid():
    #             serializer.save()
    #             return Response(serializer.data, status=status.HTTP_201_CREATED)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
