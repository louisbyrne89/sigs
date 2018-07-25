# -*- coding: utf-8 -*-

from django.db import models


class DailyGlobalIrradiance(models.Model):
    latitude = models.DecimalField(null=False, decimal_places=2, max_digits=4)
    longitude = models.DecimalField(null=False, decimal_places=2, max_digits=4)
    date = models.DateField(null=False)
    horizontal_CMSAF = models.DecimalField(null=True, decimal_places=2, max_digits=6)

