from rest_framework import viewsets

from .models import Module, Repository
from .serializers import WeekSerializer, TotalSerializer, WeekProjectsSerializer


class RepositoryWeekViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = WeekSerializer
    http_method_names = ['get']


class TotalStatisticViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = TotalSerializer
    http_method_names = ['get']

