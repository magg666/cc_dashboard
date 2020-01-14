from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import URLValidator


class Module(models.Model):
    """
    Students' learning stage
    """
    objects = models.Manager()

    MODULES = [
        ('PB', 'ProgBasic Module'),
        ('WEB', 'Web & SQL'),
        ('OOP', 'OOP Module'),
        ('ADV', 'Advanced Module')]

    module = models.CharField(max_length=5, choices=MODULES, name='module')

    class Meta:
        db_table = 'module'

    def __str__(self):
        return self.get_module_display()


class Repository(models.Model):
    """
    Model Repository contain data about work of CodeCool's students.
    Fields:
        date - date of adding record;
        url - link to github repository for project
        plan - link to plan for project
        owner - project owner login
        project - project name
        module - current module of students. Foreign key to Module.

    Methods:
        __str__

    """

    class Meta:
        db_table = 'repository'
        indexes = [
            models.Index(fields=['date', 'url']),
        ]

    # fields
    date = models.DateField(auto_now=True)
    url = models.URLField(name='url', validators=[URLValidator], null=False)
    plan = models.URLField(validators=[URLValidator])
    owner = models.CharField(max_length=100, name="owner")
    project = models.CharField(max_length=100, name='project')
    module = models.ForeignKey(Module, related_name='projects', on_delete=models.DO_NOTHING, null=False)

    def __str__(self) -> str:
        """
        Method to string
        :return:
            project name: str
        """

        return str(self.project)


# signals for Repository Model
NO_SCHEME_INDEX = 1
OWNER_INDEX = 1
PROJECT_INDEX = 2


@receiver(post_save, sender=Repository)
def repository_owner(instance, created, **kwargs):
    if created:
        try:
            owner = str(instance.url).split("//")[NO_SCHEME_INDEX].split("/")[OWNER_INDEX]
            Repository.objects.filter(pk=instance.pk).update(owner=owner)
        except IndexError:
            Repository.objects.filter(pk=instance.pk).update(owner="Unknown")


@receiver(post_save, sender=Repository)
def repository_project(instance, created, **kwargs):
    if created:
        project = str(instance.url).split("//")[NO_SCHEME_INDEX].split("/")[PROJECT_INDEX]
        Repository.objects.filter(pk=instance.pk).update(project=project)


class WeeklyStatistic(models.Model):
    """
    Summarized data about each active repository on a weekly basis.
    Keeps data about current week contributors' commits, deletions and additions
    Fields:
        repository - ForeignKey Repository;
        week - date from timestamp;
        contributor - login of project contributor;
        commits - amount of commits for given contributor;
        additions - amount of additions for given contributor
        deletions - amount of deletions for given contributor

    Methods
        __str__
    """

    class Meta:
        db_table = 'weekly_statistic'

    # fields
    repository = models.ForeignKey(Repository, related_name='users', on_delete=models.CASCADE)
    week = models.DateField()
    contributor = models.CharField(max_length=100)
    commits = models.IntegerField()
    additions = models.IntegerField()
    deletions = models.IntegerField()

    def __str__(self) -> str:
        """
        Method to string
        :return:
            project name and contributor : str

        """
        return f'{self.repository.__str__()}: {self.contributor}'


class TotalStatistic(models.Model):
    """
    Summarized data about each active repository.
    Keeps data about total statistic for project
    Fields:
        repository - ForeignKey Repository;
        commits - amount of commits for project;
        additions - amount of additions for project;
        deletions - amount of deletions for project;

    Methods
        __str__
    """

    class Meta:
        db_table = 'statistic'

    # fields
    repository = models.ForeignKey(Repository, related_name='total', on_delete=models.CASCADE)
    commits = models.IntegerField()
    additions = models.IntegerField()
    deletions = models.IntegerField()

    def __str__(self) -> str:
        """
        Method to string
        :return:
            project name and contributor : str

        """
        return f'{self.repository.__str__()}: {self.commits}'
