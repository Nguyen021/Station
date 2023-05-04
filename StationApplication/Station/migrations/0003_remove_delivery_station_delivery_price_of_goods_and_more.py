# Generated by Django 4.1.7 on 2023-04-02 08:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Station', '0002_alter_trip_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='delivery',
            name='station',
        ),
        migrations.AddField(
            model_name='delivery',
            name='price_of_goods',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='delivery',
            name='price_of_ship',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='delivery',
            name='trip',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Station.trip'),
        ),
        migrations.AddField(
            model_name='trip',
            name='total_seats',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='delivery',
            name='delivery_time',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='delivery',
            name='weight',
            field=models.FloatField(null=True),
        ),
    ]