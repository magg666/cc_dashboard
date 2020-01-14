from rest_framework import serializers


class CalendarSerializer(serializers.Serializer):
    """
    Serialize data from Google Api Calendar
    """
    start = serializers.DateTimeField()
    end = serializers.DateTimeField()
    summary = serializers.CharField()
    all_day = serializers.BooleanField()
