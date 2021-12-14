from typing import Dict
from django.contrib.auth.models import Group
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from users.models import User
from constants import GROUPS
from rest_framework.authtoken.models import Token

class UserTests(APITestCase):
    token = None

    def setUp(self):
      for group in GROUPS:
        Group.objects.get_or_create(name=group)

      adminUser = User.objects.create(
        email='testUser@test.com', 
        first_name='Matheus',
        last_name='Smith',
        password='test978453442',
        title='professor',
        username='TestUser12',
        groups=Group.objects.get(name=GROUPS[0])
        )

      self.token = Token.objects.create(user=adminUser)
      
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
          'title': 'professor',
          'username': 'TestUser'
          }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)
        group = Group.objects.get(name=GROUPS[1])
        self.assertEqual(response.data['groups'], group.id)

    def test_too_simple_password(self):
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

    def test_numeric_password(self):
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

    def test_too_short_password(self):
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

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)

        self.client.credentials()

    def test_get_users_detail(self):
        """
        Ensure getting user detail
        """
        url = reverse('users-detail', kwargs={'pk': 1})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, Dict)

        self.client.credentials()
    
    def test_update_user(self):
        """
        Ensure user can be updated
        """
        url = reverse('users-detail', kwargs={'pk': 1})
        data = {
          'email': 'test1234@test.com',
          'first_name': 'Matheus',
          'last_name': 'Smith',
          'password': 'test18234382123',
          'title': 'professor',
          'username': 'TestUser123'
          }

        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, Dict)

        self.client.credentials()

    def test_delete_user(self):
        """
        Ensure user can be deleted
        """
        userToDelete = User.objects.create(
          email='userToDelete@test.com', 
          first_name='Matheus',
          last_name='Smith',
          password='test978453442',
          title='professor',
          username='userToDelete',
          groups=Group.objects.get(name=GROUPS[1])
          )

        url = reverse('users-detail', kwargs={'pk': userToDelete.id})

        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.delete(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, None)

        self.client.credentials()
        
    # TODO Add Test cases for Login and Logout Views