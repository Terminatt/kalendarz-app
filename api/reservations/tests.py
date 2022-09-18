import datetime
from rest_framework.test import APITestCase
from django.contrib.auth.models import Group
from reservations.models import Reservation
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
    
    room = None

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

      big_room_type = RoomType.objects.create(name='Big room', color='#000000')
      self.room = Room.objects.create(name='A204', capacity=50, floor='first', type=big_room_type)

      Reservation.objects.create(
        start=datetime.datetime(2022, 1, 1, 10, 30, 0),
        end=datetime.datetime(2022, 1, 1, 11, 45, 0),
        room=self.room,
        user=self.admin_user
      )

      Reservation.objects.create(
        start=datetime.datetime(2022, 1, 1, 8, 30, 0),
        end=datetime.datetime(2022, 1, 1, 11, 45, 0),
        room=self.room,
        user=self.regular_user
      )

    def test_create_reservation(self):
        data = {
            'start': datetime.datetime(2022, 1, 1, 12, 30, 0).isoformat(),
            'end': datetime.datetime(2022, 1, 1, 14, 45, 0).isoformat(),
            'room': 1,
            'user': 1
        }

        url = reverse('reservation-list')
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Reservation.objects.count(), 3)

        self.client.cookies['auth_token'] = None

    def test_create_reservation_not_logged_user(self):
        data = {
            'start': datetime.datetime(2022, 1, 1, 12, 30, 0).isoformat(),
            'end': datetime.datetime(2022, 1, 1, 14, 45, 0).isoformat(),
            'room': 1,
            'user': 1
        }

        url = reverse('reservation-list')

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_reservation_regular_user(self):
        data = {
            'start': datetime.datetime(2022, 1, 1, 12, 30, 0).isoformat(),
            'end': datetime.datetime(2022, 1, 1, 14, 45, 0).isoformat(),
            'room': 1,
            'user': 1
        }

        url = reverse('reservation-list')
        self.client.cookies['auth_token'] = self.regular_user_token

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Reservation.objects.count(), 3)

        self.client.cookies['auth_token'] = None

    def test_get_reservation_list(self):
        url = reverse('reservation-list')
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(list(response.data.values())[0], 2)

        self.client.cookies['auth_token'] = None

    def test_get_reservation_list_not_authenticated(self):
        url = reverse('reservation-list')

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(list(response.data.values())[0], 2)

    def test_get_reservation_regular_user(self):
        url = reverse('reservation-list')
        self.client.cookies['auth_token'] = self.regular_user_token

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(list(response.data.values())[0], 2)

        self.client.cookies['auth_token'] = None

    def test_get_reservation(self):
        url = reverse('reservation-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.cookies['auth_token'] = None

    def test_get_reservation_not_authenticated(self):
        url = reverse('reservation-detail', kwargs={'pk': 1})

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_reservation(self):
        url = reverse('reservation-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.regular_user_token

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.cookies['auth_token'] = None

    def test_update_reservation(self):
        url = reverse('reservation-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.patch(url, {'start': datetime.datetime(2022, 1, 1, 12, 45, 0).isoformat()}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.cookies['auth_token'] = None

    def test_update_reservation_not_logged_user(self):
        url = reverse('reservation-detail', kwargs={'pk': 1})

        response = self.client.patch(url, {'start': datetime.datetime(2022, 1, 1, 12, 45, 0).isoformat()}, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_reservation_regular_user_not_owned_by_user(self):
        url = reverse('reservation-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.regular_user_token

        response = self.client.patch(url, {'start': datetime.datetime(2022, 1, 1, 12, 45, 0).isoformat()}, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.cookies['auth_token'] = None

    def test_update_reservation_regular_user_not_owned_by_user(self):
        url = reverse('reservation-detail', kwargs={'pk': 2})
        self.client.cookies['auth_token'] = self.regular_user_token

        response = self.client.patch(url, {'start': datetime.datetime(2022, 1, 1, 12, 45, 0).isoformat()}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.cookies['auth_token'] = None

    def test_delete_reservation(self):
        url = reverse('reservation-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.client.cookies['auth_token'] = None

    def test_delete_reservation_not_logged_user(self):
        url = reverse('reservation-detail', kwargs={'pk': 1})

        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_reservation_regular_user_not_owned_by_user(self):
        url = reverse('reservation-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.regular_user_token

        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.cookies['auth_token'] = None

    def test_delete_reservation_regular_user_not_owned_by_user(self):
        url = reverse('reservation-detail', kwargs={'pk': 2})
        self.client.cookies['auth_token'] = self.regular_user_token

        response = self.client.delete(url, {'start': datetime.datetime(2022, 1, 1, 12, 45, 0).isoformat()}, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.client.cookies['auth_token'] = None

    def test_delete_user_cascade_delete_reservation(self):
        url = reverse('users-detail', kwargs={'pk': 2})
        self.client.cookies['auth_token'] = self.token

        self.client.delete(url, format='json')

        self.assertEqual(Reservation.objects.count(), 1)

        self.client.cookies['auth_token'] = None