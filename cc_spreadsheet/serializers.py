from rest_framework import serializers

from cc_spreadsheet.models import Celebrant


class ActiveCelebrantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Celebrant
        fields = ['first_name', 'last_name', 'exam', 'pass_date']
