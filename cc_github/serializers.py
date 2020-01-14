from datetime import date
from dateutil.relativedelta import relativedelta, SU, MO
from rest_framework import serializers
from .utils import get_current_repositories

from .models import Module, Repository, WeeklyStatistic, TotalStatistic


class ActiveRepositoriesSerializer(serializers.ListSerializer):

    def update(self, instance, validated_data):
        pass

    def to_representation(self, data):
        today = date.today()
        last_monday = today + relativedelta(weekday=MO(-1))
        data = data.filter(date__range=(last_monday, today))
        return super().to_representation(data)


# serializers for overall statistics

class ValidTotalSerializer(ActiveRepositoriesSerializer):
    def to_representation(self, data):
        data = data.exclude(total__isnull=True)
        return super().to_representation(data)


class TotalDataSerializer(serializers.ModelSerializer):
    """
    Serialize overall statistics
    """

    class Meta:
        model = TotalStatistic
        fields = ['commits', 'additions', 'deletions']


class TotalProjectsSerializer(serializers.ModelSerializer):
    total = TotalDataSerializer(many=True, read_only=True)
    project = serializers.SerializerMethodField()

    class Meta:
        model = Repository
        fields = ['project', 'total']
        list_serializer_class = ValidTotalSerializer

    @staticmethod
    def get_project(obj):
        return obj.project.replace('-', ' ').title() if obj.project else None


class TotalSerializer(serializers.ModelSerializer):
    projects = TotalProjectsSerializer(many=True, read_only=True)
    module = serializers.SerializerMethodField()

    @staticmethod
    def get_module(obj):
        return obj.get_module_display()

    class Meta:
        model = Module
        fields = ['module', 'projects']


# serializers for weekly GitHub statistics
class CurrentWeekSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        pass

    def to_representation(self, data):
        today = date.today()
        last_sunday = today + relativedelta(weekday=SU(-1))
        data = data.filter(week__range=[last_sunday, today])
        data = data.exclude(commits=0)
        return super().to_representation(data)


class ExistWeekStatsSerializer(ActiveRepositoriesSerializer):
    def to_representation(self, data):
        data = super().to_representation(data)
        for elem in data[:]:
            if not elem['users']:
                data.remove(elem)
        return data


class WeekDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyStatistic
        fields = ['contributor', 'commits']
        list_serializer_class = CurrentWeekSerializer


class WeekProjectsSerializer(serializers.ModelSerializer):
    users = WeekDataSerializer(many=True, read_only=True)
    project = serializers.SerializerMethodField()

    class Meta:
        model = Repository
        fields = ['project', 'users']
        list_serializer_class = ExistWeekStatsSerializer

    @staticmethod
    def get_project(obj):
        return obj.project.replace('-', ' ').title() if obj.project else None


class WeekSerializer(serializers.ModelSerializer):
    qs = get_current_repositories()
    projects = WeekProjectsSerializer(instance=qs, many=True, read_only=True)
    module = serializers.SerializerMethodField()

    @staticmethod
    def get_module(obj):
        return obj.get_module_display()

    class Meta:
        model = Module
        fields = ['module', 'projects']
