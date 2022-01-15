from django.db import models
from django.contrib.auth.models import User
from datetime import date, datetime
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
    old_value = models.CharField(max_length=100)
    new_value = models.CharField(max_length=100)
    user = models.ForeignKey(User)
    timestamp = models.DateTimeField(auto_now_add=True, datetime=datetime.now)
    issue = models.ForeignKey(Issue)