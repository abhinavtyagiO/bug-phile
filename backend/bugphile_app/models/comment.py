from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from models.issue import Issue

class Comment(models.Model):
    commenter = models.ForeignKey(User)
    timestamp = models.DateTimeField(auto_now_add=True)
    text = RichTextField()
    issue = models.ForeignKey(Issue)
