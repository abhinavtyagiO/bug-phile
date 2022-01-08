from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from models.issue import Issue
from datetime import datetime

class Comment(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True, datetime=datetime.now)
    text = RichTextField()
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
