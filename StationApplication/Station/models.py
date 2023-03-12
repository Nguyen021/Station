from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    avatar = models.ImageField(upload_to='users/%Y/%m', null=True)
    # pass


# Create your models here.
class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Station(BaseModel):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


# class TransportCompany(models.Model):
#     name = models.CharField(max_length=255)
#     avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
#     status = models.BooleanField(default=False)
#
#     def __str__(self):
#         return self.name
#
# class Route(models.Model):
#     transport_company = models.ForeignKey(TransportCompany, on_delete=models.CASCADE)
#     name = models.CharField(max_length=255)
#     start_location = models.CharField(max_length=255)
#     end_location = models.CharField(max_length=255)
#
#     def __str__(self):
#         return self.name
#
# class Trip(models.Model):
#     route = models.ForeignKey(Route, on_delete=models.CASCADE)
#     start_time = models.DateTimeField()
#     end_time = models.DateTimeField()
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#
#     def __str__(self):
#         return f'{self.route.name} - {self.start_time.strftime("%d/%m/%Y %H:%M")}'
#
#
# class Ticket(models.Model):
#     trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     quantity = models.IntegerField(default=1)
#     is_paid_online = models.BooleanField(default=False)
#     is_paid_offline = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#
#     def __str__(self):
#         return f'{self.user.username} - {self.trip.route.name} - {self.created_at.strftime("%d/%m/%Y %H:%M")}'

class Route(BaseModel):
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    start_point = models.CharField(max_length=255)
    end_point = models.CharField(max_length=255)
    distance = models.FloatField()
    duration = models.FloatField()

    def __str__(self):
        return self.name

class Trip(BaseModel):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    price = models.FloatField()
    available_seats = models.IntegerField()

    def __str__(self):
        return f'{self.route.name} - {self.start_time.strftime("%d/%m/%Y %H:%M")}'

class Booking(BaseModel):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    number_of_seats = models.IntegerField()
    PAYMENT_METHODS = (
        (1, 'Online'),
        (2, 'Cash on delivery'),
    )
    payment_method = models.IntegerField(choices=PAYMENT_METHODS)
    PAYMENT_STATUSES = (
        (1, 'Paid'),
        (2, 'Unpaid'),
    )
    payment_status = models.IntegerField(choices=PAYMENT_STATUSES)
    booking_time = models.DateTimeField()

    def __str__(self):
        return f'{self.user.username} - {self.trip.route.name} - {self.created_at.strftime("%d/%m/%Y %H:%M")}'


class Delivery(BaseModel):
    name = models.CharField(max_length=255)
    station = models.ForeignKey(Station, on_delete=models.CASCADE, related_name='deliveries_received')
    sender_name = models.CharField(max_length=255)
    sender_address = models.CharField(max_length=255)
    sender_phone = models.CharField(max_length=20)
    receiver_name = models.CharField(max_length=255)
    receiver_address = models.CharField(max_length=255)
    receiver_phone = models.CharField(max_length=20)
    weight = models.FloatField()
    delivery_time = models.DateTimeField()

    def __str__(self):
        return f'{self.name}  - {self.sender_name} - {self.sender_address} - {self.sender_phone} - {self.receiver_name} - {self.receiver_address} - {self.receiver_phone}'