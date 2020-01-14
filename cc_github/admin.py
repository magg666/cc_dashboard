from django.contrib import admin

from .models import Module, Repository, WeeklyStatistic, TotalStatistic


class RepositoryAdmin(admin.ModelAdmin):
    fields = ("url", "plan", "module")


admin.site.register(Module)
admin.site.register(Repository, RepositoryAdmin)
admin.site.register(WeeklyStatistic)
admin.site.register(TotalStatistic)
