from django.db import models
from datetime import datetime

class IssuePriority(models.Model):
    ISSUE_PRIORITY = [
        ('LOW','low'),
        ('MODERATE','moderate'),
        ('HIGH','high'),
        ('NONE','none'),
    ]
    text = models.CharField(max_length=100, choices=ISSUE_PRIORITY, default='moderate')
    color = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True,datetime=datetime.now)