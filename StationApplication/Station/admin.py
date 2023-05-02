from django.contrib import admin
from .models import Station, Trip, Route, Delivery, Booking, User, Bus, Comment


# Register your models here.
class BusAdmin(admin.ModelAdmin):
    list_display = ['id', 'license', 'station', 'driver']


admin.site.register(Station)
admin.site.register(Trip)
admin.site.register(Route)
admin.site.register(Delivery)
admin.site.register(Booking)
admin.site.register(User)
admin.site.register(Comment)
admin.site.register(Bus, BusAdmin)
