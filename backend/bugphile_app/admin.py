from django.contrib import admin
from bugphile_app.models import *

admin.site.register(Comment)
admin.site.register(User)
admin.site.register(Issue)
admin.site.register(IssueEvent)
admin.site.register(IssuePriority)
admin.site.register(IssueStatus)
admin.site.register(IssueTag)
admin.site.register(Project)
admin.site.register(ProjectStatus)