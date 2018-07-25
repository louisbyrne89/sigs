# -*- coding: utf-8 -*-

from ..models import HourlyGlobalIrradiance


from rest_framework import serializers


class HourlyGlobalIrradianceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HourlyGlobalIrradiance
        fields = ("url", "id", "latitude", "total_kaplanis_lj", "direct_kaplanis_lj_erbs", "diffuse_kaplanis_lj_erbs")
