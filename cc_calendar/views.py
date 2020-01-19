import os
from .serializers import CalendarSerializer
from rest_framework import viewsets
from .tasks import get_data_from_calendar


class CalendarEventsViewSet(viewsets.ModelViewSet):
    """
    Api view for Google calendar for cc events
    """

    def get_queryset(self):
        return get_data_from_calendar(
            os.environ.get("EVENTS_CALENDAR_ID"),
            6  # number of events to get
        )

    serializer_class = CalendarSerializer


class CalendarStudentsViewSet(viewsets.ModelViewSet):
    """
    Api view for Google calendar for cc consultations
    """

    def get_queryset(self):
        return get_data_from_calendar(
            os.environ.get("EVENTS_STUDENTS_ID"),
            6  # number of events to get
        )

    serializer_class = CalendarSerializer
