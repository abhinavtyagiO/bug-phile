from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsProjectCreatorOrMemberOrReadOnly(BasePermission):
    """
    Object-level permission to allow only creator or members of a
    project to edit it.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        is_creator = request.user == obj.creator
        is_member = request.user in obj.members

        return is_creator or is_member