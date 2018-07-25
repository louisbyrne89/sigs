# -*- coding: utf-8 -*-

from django.db import models


class HourlyGlobalIrradiance(models.Model):
    latitude = models.DecimalField(null=False, decimal_places=2, max_digits=4)
    datetime = models.DateTimeField(null=False)
    total_kaplanis_lj = models.DecimalField(null=False, decimal_places=2, max_digits=6)

