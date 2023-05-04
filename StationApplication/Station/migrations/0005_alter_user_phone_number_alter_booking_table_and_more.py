# Generated by Django 4.1.7 on 2023-04-23 10:04

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Station', '0004_user_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=12, null=True, validators=[django.core.validators.RegexValidator(message='Số điện thoại không hợp lệ.', regex='^\\+?(?:84|0)(\\d{9,10})$')]),
        ),
        migrations.AlterModelTable(
            name='booking',
            table='Booking',
        ),
        migrations.AlterModelTable(
            name='bus',
            table='Bus',
        ),
        migrations.AlterModelTable(
            name='delivery',
            table='Delivery',
        ),
        migrations.AlterModelTable(
            name='route',
            table='Route',
        ),
        migrations.AlterModelTable(
            name='station',
            table='Station',
        ),
        migrations.AlterModelTable(
            name='trip',
            table='Trip',
        ),
    ]