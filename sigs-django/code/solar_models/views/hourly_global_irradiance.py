# -*- coding: utf-8 -*-

from ..models import HourlyGlobalIrradiance
from ..serializers import HourlyGlobalIrradianceSerializer
from rest_framework import generics


class HourlyGlobalIrradianceList(generics.ListCreateAPIView):
    """
    List all HourlyGlobalIrradiance or create a new HourlyGlobalIrradiance.
    """
    queryset = HourlyGlobalIrradiance.objects.all()
    serializer_class = HourlyGlobalIrradianceSerializer
    #filter_fields = ('document', )
    #permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class HourlyGlobalIrradianceDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete HourlyGlobalIrradiance.
    """
    queryset = HourlyGlobalIrradiance.objects.all()
    serializer_class = HourlyGlobalIrradianceSerializer
    #permission_classes = (permissions.IsAuthenticated,)


    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



