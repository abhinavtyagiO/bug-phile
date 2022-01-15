from django.db import models
from models.project import Project
from models.issue_status import IssueStatus
from models.issue_priority import IssuePriority
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField

class Issue(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    reporter = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = RichTextField(blank=True)
    status = models.ForeignKey(IssueStatus, null=True, on_delete=models.SET_NULL)
    priority = models.ForeignKey(IssuePriority, null=True, on_delete=models.SET_NULL)
    assignee = models.ManyToManyField(User, null=True, on_delete=models.SET_NULL)
 