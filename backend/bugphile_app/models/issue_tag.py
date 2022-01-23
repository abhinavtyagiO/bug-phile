from django.db import models


class IssueTag(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}: {self.color}"

    class Meta:
        verbose_name = "Issue Tag"
        verbose_name_plural = "Issue Tags"
   