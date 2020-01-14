from django.urls import path, include
from rest_framework import routers

from .views import RepositoryWeekViewSet, TotalStatisticViewSet

router = routers.DefaultRouter()
router.register(r'week', RepositoryWeekViewSet, 'week')
router.register(r'total', TotalStatisticViewSet, 'total')


urlpatterns = [
    path("", include(router.urls)),

]
