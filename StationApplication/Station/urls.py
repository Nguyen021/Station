from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

route = DefaultRouter()
route.register('users', UserViewSet)
route.register('station', StationViewSet)
route.register('route', RouteViewSet)
route.register('bus', BusViewSet)
route.register('trip', TripViewSet)
route.register('delivery', DeliveryViewSet)
urlpatterns = [
    path('', include(route.urls)),
]
