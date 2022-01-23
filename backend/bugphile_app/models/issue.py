from django.db import models
from bugphile_app.models import (
    IssueTag,
    Project,
    IssueStatus,
    IssuePriority,
)
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField

class Issue(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='issues_reported')
    title = models.CharField(max_length=100)
    description = RichTextField(blank=True)
    status = models.ForeignKey(IssueStatus, null=True, on_delete=models.SET_NULL)
    priority = models.ForeignKey(IssuePriority, null=True, on_delete=models.SET_NULL)
    assignee = models.ManyToManyField(User, related_name='issues_assigned')
    tags = models.ManyToManyField(IssueTag)

    def __str__(self):
        return f"{self.title}: {self.project.name}"

    class Meta:
        verbose_name = "Issue"
        verbose_name_plural = "Issues"
