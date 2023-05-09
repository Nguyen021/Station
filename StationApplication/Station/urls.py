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
route.register('comments', CommentViewSet)
route.register('booking', BookingList, basename='booking-list')
route.register('booking-create', BookingCreate, basename='booking-create')
route.register('list-station', ListStationView, basename='list-station')
route.register('search-trip', TripSearchViewSet, basename='search-trip')
urlpatterns = [
    path('', include(route.urls)),
    path('trip/compare/<int:route_id>/', TripCompareView.as_view(), name='trip_compare'),
    path('station/<int:station_id>/unactive/', UnactiveStation.as_view(), name='station_unactive'),
    path('revenue_report/<int:station_id>', RevenueReportView.as_view(), name='revenue_report'),
    path('station/<int:station_id>/routes/<int:route_id>/booking-stats/', booking_stats_by_station_and_route),
]
