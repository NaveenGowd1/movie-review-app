from rest_framework.permissions import (
    IsAdminUser,
    SAFE_METHODS,
    BasePermission
)

class IsAdminOrReadOnly(BasePermission):
    """
    Custom permission to only allow admin users to edit objects.
    Read-only access is allowed for all users.
    """

    def has_permission(self, request, view):
        # Allow read-only access for safe methods (GET, HEAD, OPTIONS)
        if request.method in SAFE_METHODS:
            return True
        # Allow write access only for admin users
        return request.user and request.user.is_staff