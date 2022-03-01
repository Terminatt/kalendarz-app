from rest_framework.viewsets import ModelViewSet
import json;
import importlib
from django.db.models import ProtectedError
from rest_framework.response import Response
from rest_framework import status
from utils.response_error import ErrorType, get_error_dict


acl_matrix = json.load(open("acl/acl.json"))

class CustomModelViewSet(ModelViewSet):
    """
    Extended Model view to load permissions from json file

    Props:
        acl_name: key used for retrieving acl list from json file
        avoid_authentication: list of methods that should not use authentication
    """
    acl_name = None
    avoid_authentication = []
    create_many = False

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

    def get_authenticators(self):
        """
        Override!
        
        Disable authentication for provided methods
        """
        print(self.action)
        if self.action in self.avoid_authentication:
            return []
        return super().get_authenticators()
    
    def initialize_request(self, request, *args, **kwargs):
        """
        Override!
        
        Set action at the begining of the request
        """
        self.action = self.action_map.get(request.method.lower())
        return super().initialize_request(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Override!
        
        Provide many to serializer
        """
        many = False
        if self.create_many:
            many = isinstance(request.data, list)


        serializer = self.get_serializer(data=request.data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        """
        Override!
        
        Change error structure returned by this method
        """
        try:
            return super().destroy(request, *args, **kwargs)

        except ProtectedError as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data=get_error_dict(errorType=ErrorType.RELATED_OBJECT, msg='This object is in relation with another object'))

        except Exception as e:
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR, data=e)
