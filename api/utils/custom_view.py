from rest_framework.viewsets import ModelViewSet

class CustomModelViewSet(ModelViewSet):
    pc_create = []
    pc_list = []
    pc_retrieve = []
    pc_update = []
    pc_delete = []

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = self.pc_create
        elif self.action == 'list':
            permission_classes = self.pc_list
        elif self.action == 'retrieve':
            permission_classes = self.pc_retrieve
        elif self.action == 'update' or self.action == 'partial_update':
            permission_classes = self.pc_update
        elif self.action == 'destroy':
            permission_classes = self.pc_delete

        return [permission() for permission in permission_classes]