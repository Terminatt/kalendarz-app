from rest_framework.viewsets import ModelViewSet
import json;
import importlib

acl_matrix = json.load(open("acl/acl.json"))

class CustomModelViewSet(ModelViewSet):
    """
    Extended Model view to load permissions from json file

    Props:
        acl_name: key used for retrieving acl list from json file
    """
    acl_name = None

    def import_permission_class(self, acl):
        """
        Dynamically import permission class from a file

        Args:
            acl: a name for permission class inside the list for particular HTTP method
        """
        return getattr(importlib.import_module("users.permission"), "Is" + acl)
    
    def get_acl_json_list(self):
        """
        Get acls list for particular method from acl_matrix
        """
        if self.action == None:
            return []

        return acl_matrix[self.acl_name]["permissions"][self.action]

    def get_permission_from_acl(self, acls):
        """
        Get permission class list

        Args:
            acls: a list of acls for particular HTTP method
        """
        permissions = []
        for acl in acls:
            PermissionClass = self.import_permission_class(acl=acl)
            permissions.append(PermissionClass)
        return permissions

    def get_permissions(self):
        """
        Override!
        
        Create permission_classes for ModelViewSet instance
        """
        if self.acl_name == None:
            return []
        
        acl_list = self.get_acl_json_list()

        permission_classes = self.get_permission_from_acl(acls=acl_list)
        return [permission() for permission in permission_classes]
