from django.urls import path, include
from rest_framework import routers

from .views import CalendarEventsViewSet, CalendarStudentsViewSet

router = routers.DefaultRouter()
router.register(r'events', CalendarEventsViewSet, 'events')
router.register(r'students', CalendarStudentsViewSet, 'students')


urlpatterns = [
    path("", include(router.urls)),

]

