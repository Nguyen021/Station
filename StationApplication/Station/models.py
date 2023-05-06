from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class User(AbstractUser):
    avatar = models.ImageField(upload_to='users/%Y/%m', null=True)
    phone_regex = RegexValidator(regex=r'^\+?(?:84|0)(\d{9,10})$',
                                 message="Số điện thoại không hợp lệ.")
    phone_number = models.CharField(validators=[phone_regex], max_length=12, null=True)  # Validators should be a list
    is_station = models.BooleanField(default=False)


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Station(BaseModel):
    class Meta:
        db_table = 'Station'

    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class Route(BaseModel):
    class Meta:
        db_table = 'Route'

    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    start_point = models.CharField(max_length=255)
    end_point = models.CharField(max_length=255)
    distance = models.FloatField()
    duration = models.FloatField()

    def __str__(self):
        return f' Tuyến - {self.start_point} - {self.end_point}'


class Bus(BaseModel):

    class Meta:
        db_table = 'Bus'

    license = models.CharField(max_length=10, unique=True)
    station = models.ForeignKey(Station, on_delete=models.CASCADE, related_name='bus_station')
    driver = models.CharField(max_length=100)

    def __str__(self):
        return f'Xe {self.license} - {self.driver}'


class Trip(BaseModel):
    class Meta:
        db_table = 'Trip'

    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    price = models.FloatField()
    available_seats = models.IntegerField()
    image = models.ImageField(upload_to='trip/%Y/%m', null=True)
    total_seats = models.IntegerField(default=0)
    description = models.TextField(null=True)

    def __str__(self):
        return f'{self.route} - {self.start_time.strftime("%d/%m/%Y %H:%M")}'


class Booking(BaseModel):
    class Meta:
        db_table = 'Booking'

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
    total_price = models.DecimalField(max_digits=20, decimal_places=2, null=True)

    def __str__(self):
        return f'{self.user.username} đặt {self.trip.route} của Nhà xe {self.trip.station.name}'


class Delivery(BaseModel):
    class Meta:
        db_table = 'Delivery'

    name = models.CharField(max_length=255)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)
    sender_name = models.CharField(max_length=255)
    sender_address = models.CharField(max_length=255)
    sender_phone = models.CharField(max_length=20)
    receiver_name = models.CharField(max_length=255)
    receiver_address = models.CharField(max_length=255)
    receiver_phone = models.CharField(max_length=20)
    weight = models.FloatField(null=True)
    delivery_time = models.DateTimeField(null=True)
    price_of_goods = models.FloatField(null=True)
    price_of_ship = models.FloatField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='delivery_user')

    def __str__(self):
        return f'{self.name}  - {self.sender_name} - {self.sender_address} - {self.sender_phone} - {self.receiver_name} ' \
               f'- {self.receiver_address} - {self.receiver_phone}'


class Comment(BaseModel):
    class Meta:
        db_table = 'Comment'

    content = models.TextField()
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='comment_trip', null=True)
    station = models.ForeignKey(Station, on_delete=models.CASCADE, related_name='comment_station', null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comment_user')

    def __str__(self):
        return f'Bình luận {self.content} - {self.trip.route.start_point}->{self.trip.route.end_point} - {self.user.username}'


class ActionBase(BaseModel):
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('station', 'user')
        abstract = True


class Rating(ActionBase):
    rate = models.SmallIntegerField(default=0)
