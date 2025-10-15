from rest_framework import permissions

class IsAdministrator(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and 
                   request.user.role == 'ADMIN')
    

class IsAdministratorOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Разрешаем безопасные методы (GET, HEAD, OPTIONS) всем
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Разрешаем запись только администраторам
        return bool(request.user and request.user.is_authenticated and 
                   request.user.role == 'ADMIN')

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

class IsAuntificated(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and
                    request.user.role == 'REGULAR')