from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsMasterOrReadOnly(BasePermission):
    """
    Global permission check if user is master,
    or allow safe methods only.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS: 
            return True 
        return request.user.is_master

class IsMaster(BasePermission):
    """
    Global permission check if user is master.
    """

    def has_permission(self, request, view):
        return request.user.is_master
