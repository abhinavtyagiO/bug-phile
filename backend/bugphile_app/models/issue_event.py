from django.db import models
from datetime import date, datetime
from bugphile_app.models import Issue, User


class IssueEvent(models.Model):
    PROJECT_STATUS_TYPE = [
        ('TESTING', 'Testing'),
        ('DEPLOYED', 'Deployed'),
        ('PRODUCTION', 'Production'),
        ('DEVLOPMENT', 'Develpoment'),
        ('SCRAPPED', 'Scrapped'),
        ('FINISHED', 'Finished')
    ]
    type = models.CharField(choices=PROJECT_STATUS_TYPE, default='Testing', max_length=100)
    old_value = models.CharField(max_length=100)
    new_value = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)