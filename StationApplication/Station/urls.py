from django.urls import path, include
from .views import *
from rest_framework import routers


routers = routers.DefaultRouter()
routers.register('users',UserViewSet)
urlpatterns = [
    path('', include(routers.urls)),
    path('', index, name='index'),
    path('nhaxe/', nha_xe_list),
    # path('nhaxe/<int:pk>/', views.nha_xe_detail),
]