from django.db import models

class ProjectStatus(models.Model):
    text = models.CharField(max_length=100)
    color = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Project Status"
        verbose_name_plural = "Project Statuses"

    def __str__(self):
        return f"{self.text}: {self.color}"