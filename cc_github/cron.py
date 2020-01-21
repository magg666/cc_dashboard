from datetime import date
from django_cron import CronJobBase, Schedule

from cc_github.models import WeeklyStatistic, TotalStatistic
from cc_github.utils import get_github_statistics


class GetWeeklyStatistic(CronJobBase):
    """
    Scheduled job to get data from github
    """
    RUN_EVERY_MINS = 1

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'cc_github.get_weekly_statistic'

    def do(self) -> None:
        """
        Updates or creates github weekly statistic data for active repositories

        :return: None
        """
        repositories_data = get_github_statistics()
        last_week_index = -1

        for repository in repositories_data:

            if repository:
                for data in repository:

                    contributor = data['author']['login']
                    repository_id = data['repository_id']
                    week = date.fromtimestamp(data['weeks'][last_week_index]['w'])
                    additions = data['weeks'][last_week_index]['a']
                    deletions = data['weeks'][last_week_index]['d']
                    commits = data['weeks'][last_week_index]['c']

                    WeeklyStatistic.objects.update_or_create(repository_id=repository_id,
                                                             contributor=contributor,
                                                             week=week,
                                                             defaults={"commits": commits,
                                                                       "additions": additions,
                                                                       'deletions': deletions})


class GetTotalStatistic(CronJobBase):
    """
    Scheduled job to get data from github
    """
    RUN_EVERY_MINS = 1

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'cc_github.get_total_statistic'

    def do(self) -> None:
        """
        Updates or creates github total statistic data for project repository

        :return: None
        """
        repositories_data = get_github_statistics()

        for repository in repositories_data:
            if repository:
                commits = sum(data['total'] for data in repository)
                additions = 0
                deletions = 0

                for data in repository:
                    repository_id = data['repository_id']
                    weeks = data['weeks']
                    additions += sum(item['a'] for item in weeks)
                    deletions += sum(item['d'] for item in weeks)

                    TotalStatistic.objects.update_or_create(repository_id=repository_id,
                                                            defaults={'commits': commits,
                                                                      'additions': additions,
                                                                      'deletions': deletions})
