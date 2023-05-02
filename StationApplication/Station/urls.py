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
route.register('booking', BookingList, basename='booking-list')
route.register('booking-create', BookingCreate, basename='booking-create')
urlpatterns = [
    path('', include(route.urls)),
    path('trip/search/', SearchTripView.as_view(), name='search_trip'),
    path('trip/compare/<int:route_id>/', TripCompareView.as_view(), name='trip_compare'),
    path('station/<int:station_id>/unactive/', UnactiveStation.as_view(), name='station_unactive'),
    # path('', index, name='index'),
    # path('nhaxe/', nha_xe_list),
    # path('nhaxe/<int:pk>/', views.nha_xe_detail),
]
