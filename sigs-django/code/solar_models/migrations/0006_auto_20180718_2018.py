# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2018-07-18 20:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solar_models', '0005_auto_20180717_2305'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hourlyglobalirradiance',
            name='total_kaplanis_lj',
            field=models.DecimalField(decimal_places=2, max_digits=6),
        ),
    ]
