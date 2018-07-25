# -*- coding: utf-8 -*-

from ..models import DailyGlobalIrradiance


from rest_framework import serializers


class DailyGlobalIrradianceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyGlobalIrradiance
        fields = ("id", "latitude", "longitude", "date", "horizontal_CMSAF")
