from django.contrib import admin

from cc_spreadsheet.models import Celebrant


class CelebrantAdmin(admin.ModelAdmin):
    fields = ("first_name", "last_name", "exam", "pass_date")


admin.site.register(Celebrant, CelebrantAdmin)
