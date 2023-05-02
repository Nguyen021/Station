# Generated by Django 4.1.7 on 2023-05-01 15:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Station', '0008_user_is_station'),
    ]

    operations = [
        migrations.AlterField(
            model_name='station',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
