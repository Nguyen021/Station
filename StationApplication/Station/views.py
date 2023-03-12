from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, parsers, generics

from .models import User, Station
from .serializers import UserSerializer, StationSerializer


def index(request):
    return HttpResponse("My Application for Station")


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [parsers.MultiPartParser, ]


@api_view(['GET', 'POST'])
def nha_xe_list(request):
    """
    List all NhaXe, or create a new NhaXe.
    """
    if request.method == 'GET':
        station = Station.objects.all()
        serializer = StationSerializer(station, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)