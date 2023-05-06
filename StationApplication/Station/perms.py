from rest_framework import permissions


class CommentOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, comment):
        return request.user and request.user == comment.user


class IsStation(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        if not request.user.is_station == 1:
            return False
        return True
