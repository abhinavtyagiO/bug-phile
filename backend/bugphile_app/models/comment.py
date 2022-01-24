from django.db import models
from ckeditor.fields import RichTextField
from bugphile_app.models import Issue, User

class Comment(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    text = RichTextField()
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return f"{self.text} | Issue:{self.issue.title} | Commenter:{self.commenter.name}"

    class Meta:
        verbose_name = "Comment"
        verbose_name_plural = "Comments"