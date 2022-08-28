from rest_framework.test import APITestCase
from django.contrib.auth.models import Group
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from users.models import User
from constants import GROUPS
from rest_framework.authtoken.models import Token
from typing import Dict, OrderedDict

class UserTests(APITestCase):
    token = None
    admin_user = None

    def setUp(self):
      for group in GROUPS:
        Group.objects.get_or_create(name=group)

      self.admin_user = User.objects.create(
        email='testUser@test.com', 
        first_name='Matheus',
        last_name='Smith',
        password='test978453442',
        username='TestUser12',
        groups=Group.objects.get(name=GROUPS[0])
        )

      self.token = Token.objects.create(user=self.admin_user)

    def test_create_account(self):
        """
        Ensure we can create a new User object
        """

        url = reverse('users-list')
        data = {
          'email': 'test@test.com',
          'first_name': 'Matheus',
          'last_name': 'Smith',
          'password': 'test978453442',
          'username': 'TestUser'
          }

        response = self.client.post(url, data, format='json')
        group = Group.objects.get(name=GROUPS[1])
        user = User.objects.get(username=data['username'])

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(response.data, None)
        self.assertEqual(user.groups.id, group.id)

    def test_raise_simple_password_error(self):
        """
        Ensure the password cannot be too simple
        """

        url = reverse('users-list')
        data = {
          'email': 'test@test.com',
          'first_name': 'Matheus',
          'last_name': 'Smith',
          'password': 'test',
          'title': 'professor',
          'username': 'TestUser'
          }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_raise_numeric_password_error(self):
        """
        Ensure the password cannot be too numeric
        """

        url = reverse('users-list')
        data = {
          'email': 'test@test.com',
          'first_name': 'Matheus',
          'last_name': 'Smith',
          'password': '21431432432432',
          'title': 'professor',
          'username': 'TestUser'
          }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_raise_too_short_password_error(self):
        """
        Ensure the password cannot be too short
        """
        url = reverse('users-list')
        data = {
          'email': 'test@test.com',
          'first_name': 'Matheus',
          'last_name': 'Smith',
          'password': 'asdas123',
          'title': 'professor',
          'username': 'TestUser'
          }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_users(self):
        """
        Ensure getting the list of users
        """

        url = reverse('users-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.client.cookies['auth_token'] = self.token.key

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, OrderedDict)
        self.assertEqual(list(response.data.values())[0], 1)

        self.client.cookies['auth_token'] = None

    def test_get_users_detail(self):
        """
        Ensure getting user details
        """
        url = reverse('users-detail', kwargs={'pk': 1})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.client.cookies['auth_token'] = self.token.key

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, Dict)

        self.client.cookies['auth_token'] = None