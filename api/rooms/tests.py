from rest_framework.test import APITestCase
from django.contrib.auth.models import Group
from rooms.models import Room
from rooms.models import RoomType
from constants import GROUPS
from users.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from django.urls import reverse
from rest_framework import status

class RoomTypesTests(APITestCase):
    token = None
    admin_user = None

    regular_user = None
    regular_user_token = None

    def setUp(self):
      for group in GROUPS:
        Group.objects.get_or_create(name=group)

      self.admin_user = User.objects.create(
          email='testUser@test.com', 
          first_name='Matheus',
          last_name='Smith',
          password=make_password('test978453442'),
          username='TestUser12',
          groups=Group.objects.get(name=GROUPS[0])
        )

      self.token = Token.objects.create(user=self.admin_user)

      self.regular_user = User.objects.create(
          email='regularUser@gmail.com', 
          first_name='Caroline',
          last_name='Smith',
          password=make_password('test978453442'),
          username='regular_user12',
          groups=Group.objects.get(name=GROUPS[1])
        )

      self.regular_user_token = Token.objects.create(user=self.regular_user)

      RoomType.objects.create(name="Big room", color="#000000")
      RoomType.objects.create(name="Small room", color="#000000")

    def test_create_room_type(self):
        data = {
            "name": "Room with TV",
            "color": "#000000"
        }
        url = reverse('roomtype-list')
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(RoomType.objects.count(), 3)

        self.client.cookies['auth_token'] = None

    def test_create_room_type_unauthorized(self):
        data = {
            "name": "Room with TV",
            "color": "#000000"
        }

        url = reverse('roomtype-list')

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_room_type_wrong_role(self):
        data = {
            "name": "Room with TV",
            "color": "#000000"
        }
        url = reverse('roomtype-list')

        self.client.cookies['auth_token'] = self.regular_user_token.key

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.cookies['auth_token'] = None

    def test_create_room_type_not_unique_name(self):
        data = {
            "name": "Big room",
            "color": "#000000"
        }
        url = reverse('roomtype-list')
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.client.cookies['auth_token'] = None

    def test_get_room_types_list(self):
        url = reverse('roomtype-list')
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(list(response.data.values())[0], 2)

        self.client.cookies['auth_token'] = None

    def test_get_room_types_list_not_logged_in_user(self):
        url = reverse('roomtype-list')

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(list(response.data.values())[0], 2)


    def test_get_room_types_list_not_admin(self):
        url = reverse('roomtype-list')
        self.client.cookies['auth_token'] = self.regular_user_token.key

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(list(response.data.values())[0], 2)

        self.client.cookies['auth_token'] = None


    def test_get_room_type(self):
        url = reverse('roomtype-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.cookies['auth_token'] = None

    def test_get_room_type_not_logged_in_user(self):
        url = reverse('roomtype-detail', kwargs={'pk': 1})

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_room_type_not_admin(self):
        url = reverse('roomtype-detail', kwargs={'pk': 1})

        self.client.cookies['auth_token'] = self.regular_user_token.key

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.cookies['auth_token'] = None


    def test_update_room_type(self):
        url = reverse('roomtype-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.patch(url, {"name": "newName"}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'newName')

        self.client.cookies['auth_token'] = None

    def test_update_room_type_not_unique_name(self):
        url = reverse('roomtype-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.patch(url, {"name": "Small room"}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        self.client.cookies['auth_token'] = None

    def test_update_room_type_unauthorized(self):
        url = reverse('roomtype-detail', kwargs={'pk': 1})

        response = self.client.patch(url, {"name": "newName"}, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_room_type_wrong_role(self):
        url = reverse('roomtype-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.regular_user_token.key

        response = self.client.patch(url, {"name": "newName"}, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
        self.client.cookies['auth_token'] = None

    def test_delete_room_type(self):
        url = reverse('roomtype-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(RoomType.objects.count(), 1)

        self.client.cookies['auth_token'] = None

    def test_delete_room_type_unauthorized(self):
        url = reverse('roomtype-detail', kwargs={'pk': 1})

        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_room_type_wrong_role(self):
        url = reverse('roomtype-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.regular_user_token.key

        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.cookies['auth_token'] = None


class RoomsTests(APITestCase):
    token = None
    admin_user = None

    regular_user = None
    regular_user_token = None

    def setUp(self):
      for group in GROUPS:
        Group.objects.get_or_create(name=group)

      self.admin_user = User.objects.create(
          email='testUser@test.com', 
          first_name='Matheus',
          last_name='Smith',
          password=make_password('test978453442'),
          username='TestUser12',
          groups=Group.objects.get(name=GROUPS[0])
        )

      self.token = Token.objects.create(user=self.admin_user)

      self.regular_user = User.objects.create(
          email='regularUser@gmail.com', 
          first_name='Caroline',
          last_name='Smith',
          password=make_password('test978453442'),
          username='regular_user12',
          groups=Group.objects.get(name=GROUPS[1])
        )

      self.regular_user_token = Token.objects.create(user=self.regular_user)

      big_room = RoomType.objects.create(name="Big room", color="#000000")
      small_room = RoomType.objects.create(name="Small room", color="#000000")

      Room.objects.create(name="A204", capacity=50, floor="first", type=big_room)
      Room.objects.create(name="B102", capacity=20, floor="second", type=small_room)

    def test_create_room(self):
        data = {
            "name": "A205",
            "capacity": 60,
            "floor": "first",
            "type": 1
        }
        url = reverse('room-list')
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Room.objects.count(), 3)

        self.client.cookies['auth_token'] = None

    def test_create_room_not_unique_name(self):
        data = {
            "name": "A204",
            "capacity": 60,
            "floor": "first",
            "type": 1
        }
        url = reverse('room-list')
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.client.cookies['auth_token'] = None

    def test_create_room_not_positive_capacity(self):
        data = {
            "name": "A204",
            "capacity": -60,
            "floor": "first",
            "type": 1
        }
        url = reverse('room-list')
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.client.cookies['auth_token'] = None

    def test_create_room_not_exisiting_room_type(self):
        data = {
            "name": "A204",
            "capacity": 60,
            "floor": "first",
            "type": 99
        }
        url = reverse('room-list')
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        self.client.cookies['auth_token'] = None

    def test_create_room_unauthorized(self):
        data = {
            "name": "A204",
            "capacity": 60,
            "floor": "first",
            "type": 99
        }
        url = reverse('room-list')

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_room_wrong_role(self):
        data = {
            "name": "A204",
            "capacity": 60,
            "floor": "first",
            "type": 99
        }
        url = reverse('room-list')
        self.client.cookies['auth_token'] = self.regular_user_token.key
        
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.cookies['auth_token'] = None

    def test_get_room(self):
        url = reverse('room-detail', kwargs={"pk": 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.cookies['auth_token'] = None

    def test_get_room_not_logged_in_user(self):
        url = reverse('room-detail', kwargs={"pk": 1})

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_room_not_admin(self):
        url = reverse('room-detail', kwargs={"pk": 1})
        self.client.cookies['auth_token'] = self.regular_user_token.key

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.cookies['auth_token'] = None

    def test_get_rooms_list(self):
        url = reverse('room-list')
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(list(response.data.values())[0], 2)

        self.client.cookies['auth_token'] = None

    def test_get_rooms_list_not_logged_in_user(self):
        url = reverse('room-list')

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(list(response.data.values())[0], 2)


    def test_get_rooms_list_not_admin(self):
        url = reverse('room-list')
        self.client.cookies['auth_token'] = self.regular_user_token.key

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(list(response.data.values())[0], 2)


        self.client.cookies['auth_token'] = None

    def test_update_room(self):
        url = reverse('room-detail', kwargs={"pk": 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.patch(url, {"name": "newName"}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "newName")

        self.client.cookies['auth_token'] = None

    def test_update_room_not_unique_name(self):
        url = reverse('room-detail', kwargs={"pk": 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.patch(url, {"name": "B102"}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.client.cookies['auth_token'] = None

    def test_update_room_not_positive_capacity(self):
        url = reverse('room-detail', kwargs={"pk": 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.patch(url, {"capacity": -60}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.client.cookies['auth_token'] = None

    def test_update_room_not_exisiting_room_type(self):
        url = reverse('room-detail', kwargs={"pk": 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.patch(url, {"type": 99}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        self.client.cookies['auth_token'] = None

    def test_update_room_unauthorized(self):
        url = reverse('room-detail', kwargs={"pk": 1})

        response = self.client.patch(url, {"name": "newName"}, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_room_wrong_role(self):
        url = reverse('room-detail', kwargs={"pk": 1})
        self.client.cookies['auth_token'] = self.regular_user_token.key
        
        response = self.client.patch(url, {"name": "newName"}, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.cookies['auth_token'] = None

    def test_delete_room(self):
        url = reverse('room-detail', kwargs={"pk": 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.client.cookies['auth_token'] = None

    def test_delete_room_unauthorized(self):
        url = reverse('room-detail', kwargs={"pk": 1})

        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_room_wrong_role(self):
        url = reverse('room-detail', kwargs={"pk": 1})
        self.client.cookies['auth_token'] = self.regular_user_token.key
        
        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.cookies['auth_token'] = None

        