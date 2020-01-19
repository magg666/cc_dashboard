from datetime import date

from dateutil.relativedelta import relativedelta, MO
from rest_framework import viewsets

from cc_spreadsheet.models import Celebrant
from cc_spreadsheet.serializers import CelebrantSerializer


class CelebrantViewSet(viewsets.ModelViewSet):
    today = date.today()
    last_monday = today + relativedelta(weekday=MO(-1))
    queryset = Celebrant.objects.filter(pass_date__range=(last_monday, today))
    serializer_class = CelebrantSerializer
    http_method_names = ['get']
