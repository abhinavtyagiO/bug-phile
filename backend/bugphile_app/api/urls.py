from rest_framework.routers import DefaultRouter
from django.urls import path
from bugphile_app.views import *

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'project_status', ProjectStatusViewSet, basename='project_status')
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'issues', IssueViewSet, basename='issues')
router.register(r'issue_priority', IssuePriorityViewSet, basename='issue_priority')
router.register(r'comments', CommentViewSet, basename='comments')
router.register(r'tags', IssueTagViewSet, basename='tags')
router.register(r'issue_status', IssueStatusViewSet, basename='issue_status')
router.register(r'user_projects', UserProjectsViewSet, basename='user_projects')
router.register(r'user_issues_assigned', UserIssuesAssignedViewSet, basename='user_issues_assigned')
router.register(r'user_issues_reported', UserIssuesReportedViewSet, basename='user_issues_reported')
router.register(r'user_logged_in', UserLoggedInViewSet, basename='user_logged_in')
urlpatterns = router.urls

urlpatterns += [
    path(r'oauth', OAuthView.as_view()),
    path(r'project_issues', ProjectIssuesStatsView.as_view()),
    path(r'project_stats', ProjectStatsView.as_view()),
    path(r'users_stats', UsersStatsView.as_view()),
    path(r'who_am_i', WhoAmIView.as_view()),
    path(r'project_issues_list', ProjectIssuesView.as_view()),
    path(r'issue_comments', IssueCommentsView.as_view()),
]