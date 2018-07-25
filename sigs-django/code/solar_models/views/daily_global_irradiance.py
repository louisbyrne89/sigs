# -*- coding: utf-8 -*-

from ..models import DailyGlobalIrradiance
from ..serializers import DailyGlobalIrradianceSerializer
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

class DailyGlobalIrradianceList(generics.ListCreateAPIView):
    """
    List all DailyGlobalIrradiance or create a new DailyGlobalIrradiance.
    """
    queryset = DailyGlobalIrradiance.objects.all()
    serializer_class = DailyGlobalIrradianceSerializer
    filter_fields = ('latitude', 'longitude')
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    ordering_fields = ('__all__')
    #filter_fields = ('document', )
    #permission_classes = (permissions.IsAuthenticated,)

    # def filter_queryset(self):


    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DailyGlobalIrradianceDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete DailyGlobalIrradiance.
    """
    queryset = DailyGlobalIrradiance.objects.all()
    serializer_class = DailyGlobalIrradianceSerializer
    #permission_classes = (permissions.IsAuthenticated,)


    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



