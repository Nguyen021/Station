# Generated by Django 4.1.7 on 2023-04-02 11:26

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Station', '0003_remove_delivery_station_delivery_price_of_goods_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=11, null=True, validators=[django.core.validators.RegexValidator(message='Số điện thoại không hợp lệ.', regex='^\\+?(?:84|0)(\\d{9,10})$')]),
        ),
    ]
