from django.db import models
from django.contrib.auth.models import User

from backend.bugphile_app.models.issue import Issue


class IssueEvent(models.Model):
    PROJECT_STATUS_TYPE = [
        ('TESTING', 'Testing'),
        ('DEPLOYED', 'Deployed'),
        ('PRODUCTION', 'Production'),
        ('DEVLOPMENT', 'Develpoment'),
        ('SCRAPPED', 'Scrapped'),
        ('FINISHED', 'Finished')
    ]
    type = models.CharField(choices=PROJECT_STATUS_TYPE, default='Testing')
    oldValue = models.CharField(max_length=100)
    newValue = models.CharField(max_length=100)
    user = models.ForeignKey(User)
    timestamp = models.DateTimeField(auto_now_add=True)
    issue = models.ForeignKey(Issue)