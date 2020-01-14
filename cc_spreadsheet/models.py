from django.db import models


class Celebrant(models.Model):
    class Meta:
        db_table = "celebrants"

    EXAMS = {
        ('PA', 'PA'),
        ('TRIAL', 'TRIAL'),
        ('GO', 'GO'),
        ('JOB', 'JOB'),

    }

    date = models.DateTimeField(auto_now=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=30)
    exam = models.CharField(max_length=10, choices=EXAMS)
    pass_date = models.DateField()

    def __str__(self):
        return str(self.first_name + " " + self.last_name + " " + self.exam)
