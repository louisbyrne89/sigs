# -*- coding: utf-8 -*-

from django.conf.urls import url
from . import views

urlpatterns = [
    # url(r'^api/hourly_global_irradiance/$', views.HourlyGlobalIrradianceList.as_view(), name='hourly_global_irradiance-list'),
    # url(r'^api/hourly_global_irradiance/(?P<pk>[0-9]+)/$', views.HourlyGlobalIrradianceDetail.as_view(), name='hourly_global_irradiance-detail'),
    url(r'^api/daily_global_irradiance/$', views.DailyGlobalIrradianceList.as_view(), name='daily_global_irradiance-list'),
    url(r'^api/daily_global_irradiance/(?P<pk>[0-9]+)/$', views.DailyGlobalIrradianceDetail.as_view(), name='daily_global_irradiance-detail'),
]
