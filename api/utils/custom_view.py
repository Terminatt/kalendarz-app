from rest_framework.viewsets import ModelViewSet
import json;
import importlib

acl_matrix = json.load(open("acl/acl.json"))

class CustomModelViewSet(ModelViewSet):
    """
    Extended Model view to load permissions from json file
    """
    acl_name = None

    def import_permission_class(self, acl):
        return getattr(importlib.import_module("users.permission"), "Is" + acl)
    
    def get_acl_json_list(self):
        if self.action == None:
            return []

        return acl_matrix[self.acl_name]["permissions"][self.action]

    def get_permission_from_acl(self, acls):
        permissions = []
        for acl in acls:
            PermissionClass = self.import_permission_class(acl=acl)
            permissions.append(PermissionClass)
        return permissions

    def get_permissions(self):
        if self.acl_name == None:
            return []
        
        acl_list = self.get_acl_json_list()

        permission_classes = self.get_permission_from_acl(acls=acl_list)
        return [permission() for permission in permission_classes]
