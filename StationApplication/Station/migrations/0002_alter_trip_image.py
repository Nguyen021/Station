# Generated by Django 4.1.7 on 2023-03-27 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Station', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='image',
            field=models.ImageField(null=True, upload_to='trip/%Y/%m'),
        ),
    ]
