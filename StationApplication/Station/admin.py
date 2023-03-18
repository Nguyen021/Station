from django.contrib import admin
from .models import Station, Trip, Route, Delivery, Booking

# Register your models here.

admin.site.register(Station)
admin.site.register(Trip)
admin.site.register(Route)
admin.site.register(Delivery)
admin.site.register(Booking)
