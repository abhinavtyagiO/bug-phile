from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsIssueReporterOrReadOnly(BasePermission):
    """
    Object-level permission to allow only reporter of an issue
    to edit it.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        is_reporter = request.user == obj.reporter

        return is_reporter
