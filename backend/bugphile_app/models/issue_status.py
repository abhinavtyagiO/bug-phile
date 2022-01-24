from django.db import models

class IssueStatus(models.Model):
    text = models.CharField(max_length=50)
    color = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.text}: {self.color}"

    class Meta:
        verbose_name = "Issue Status"
        verbose_name_plural = "Issue Statuses"
