from dateutil.relativedelta import relativedelta, MO
from django.test import TestCase, Client

from .models import Celebrant
from datetime import date, timedelta

client = Client()


class TestCaseCelebrants(TestCase):
    today = date.today()
    last_monday = today + relativedelta(weekday=MO(-1))

    def setUp(self) -> None:
        Celebrant.objects.create(
            first_name="Jan",
            last_name="Nowak",
            exam='PA',
            pass_date=self.today
        )
        Celebrant.objects.create(
            first_name="Jan",
            last_name="Nowak",
            exam='TRIAL',
            pass_date=(self.today + timedelta(days=1))
        )
        Celebrant.objects.create(
            first_name="Ola",
            last_name="Nowak",
            exam='GO',
            pass_date=self.last_monday
        )
        Celebrant.objects.create(
            first_name="Ola",
            last_name="Kowalska",
            exam='PA',
            pass_date=(self.last_monday - timedelta(days=1))
        )


class CelebrantModelTest(TestCaseCelebrants):
    def test_celebrants_exist(self):
        number_exists = Celebrant.objects.filter(first_name='Jan', last_name="Nowak").count()
        exists = Celebrant.objects.count()
        ola_exists = Celebrant.objects.filter(first_name="Ola").count()
        self.assertEqual(number_exists, 2)
        self.assertEqual(exists, 4)
        self.assertEqual(ola_exists, 2)

    def test_celebrants_not_exist(self):
        number_exists = Celebrant.objects.filter(first_name="Jola").count()
        self.assertEqual(number_exists, 0)


class CelebrantApiTest(TestCaseCelebrants):

    def test_celebrants_get(self):
        response = client.get('/celebs/celebrants/')
        self.assertEqual(response.status_code, 200)

    def test_celebrants_data_get(self):
        # should return data between last monday and today (inclusive)
        response = client.get('/celebs/celebrants/')
        number = len(list(response.data))
        self.assertEqual(number, 2)
