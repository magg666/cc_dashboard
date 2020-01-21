import os
from datetime import date
import requests
from dateutil.relativedelta import relativedelta, MO

from .models import Repository


def get_current_repositories():
    today = date.today()
    last_monday = today + relativedelta(weekday=MO(-1))
    return Repository.objects.all().filter(date__range=(last_monday, today))


def get_github_statistics() -> str or list:
    """
    Fetches data from github api for active projects.
    Adds id of repository to data.

    :return:
        message: str - if error occurs
        data: list of json-encoded github statistics

    """
    token = os.environ.get("TOKEN")
    head = {'Authorization': 'token {}'.format(token)}
    active_repositories = get_current_repositories()
    processed_data = []

    for repository in active_repositories:
        owner = repository.owner
        project = repository.project

        url = f'https://api.github.com/repos/{owner}/{project}/stats/contributors'
        try:
            response = requests.get(url, headers=head)
            if not response.status_code // 100 == 2:
                return f"Error: Unexpected response {response}"

            repository_statistic = response.json()
            for data in repository_statistic:
                data['repository_id'] = repository.id
            processed_data.append(repository_statistic)

        except requests.exceptions.RequestException as e:
            return f"Serious error: {e}"

    return processed_data
