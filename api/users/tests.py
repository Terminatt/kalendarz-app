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

    regular_user = None
    regular_user_token = None

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

      self.regular_user = User.objects.create(
          email='regularUser@gmail.com', 
          first_name='Caroline',
          last_name='Smith',
          password='test978453442',
          username='regular_user12',
          groups=Group.objects.get(name=GROUPS[1])
        )

      self.regular_user_token = Token.objects.create(user=self.regular_user)

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
        self.assertEqual(User.objects.count(), 3)
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
        self.client.cookies['auth_token'] = self.token.key

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, OrderedDict)
        self.assertEqual(list(response.data.values())[0], 2)

        self.client.cookies['auth_token'] = None

    def test_get_users_unauthorized(self):
        """
        Ensure that users are not fetched if user is unauthorized
        """
        url = reverse('users-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_users_detail(self):
        """
        Ensure getting user details
        """
        url = reverse('users-detail', kwargs={'pk': 1})

        self.client.cookies['auth_token'] = self.token.key

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, Dict)

        self.client.cookies['auth_token'] = None

    def test_get_users_detail_unauthorized(self):
        """
        Ensure that user details are not fetched if user is unauthorized
        """
        url = reverse('users-detail', kwargs={'pk': 1})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_admin_user_by_admin(self):
        """
        Ensure that admin user can update their account
        """
        url = reverse('users-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.token.key
        response = self.client.patch(url, {"first_name": "newName"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], "newName")

        self.client.cookies['auth_token'] = None

    def test_update_other_user_by_admin(self):
        """
        Ensure that other user can be updated by admin
        """
        url = reverse('users-detail', kwargs={'pk': 2})
        self.client.cookies['auth_token'] = self.token.key
        response = self.client.patch(url, {"first_name": "newName"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], "newName")

        self.client.cookies['auth_token'] = None

    def test_update_other_admin_user_by_admin(self):
        """
        Ensure that other user can be updated by admin
        """
        User.objects.create(
          email='admin@gmail.com', 
          first_name='Caroline',
          last_name='Smith',
          password='test978453442',
          username='admin12',
          groups=Group.objects.get(name=GROUPS[0])
        )

        url = reverse('users-detail', kwargs={'pk': 2})
        self.client.cookies['auth_token'] = self.token.key
        response = self.client.patch(url, {"first_name": "newName"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], "newName")
        
        self.client.cookies['auth_token'] = None
    
    def test_update_regular_user_by_regular_user(self):
        """
        Ensure that regular user can update their account
        """
        url = reverse('users-detail', kwargs={'pk': 2})
        self.client.cookies['auth_token'] = self.regular_user_token.key
        response = self.client.patch(url, {"first_name": "newName"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], "newName")

        self.client.cookies['auth_token'] = None

    def test_update_other_regular_user_by_regular_user(self):
        """
        Ensure that regular user cannot update other user account
        """
        User.objects.create(
          email='anotherUser@gmail.com', 
          first_name='John',
          last_name='Calin',
          password='test978453442',
          username='another_user',
          groups=Group.objects.get(name=GROUPS[1])
        )

        url = reverse('users-detail', kwargs={'pk': 3})
        self.client.cookies['auth_token'] = self.regular_user_token.key
        response = self.client.patch(url, {"first_name": "newName"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.cookies['auth_token'] = None
    
    def test_update_other_admin_user_by_regular_user(self):
        """
        Ensure that regular user cannot update other admin user
        """
        User.objects.create(
          email='anotherUser@gmail.com', 
          first_name='John',
          last_name='Calin',
          password='test978453442',
          username='another_user',
          groups=Group.objects.get(name=GROUPS[0])
        )

        url = reverse('users-detail', kwargs={'pk': 3})
        self.client.cookies['auth_token'] = self.regular_user_token.key
        response = self.client.patch(url, {"first_name": "newName"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.cookies['auth_token'] = None

    def test_update_user_unauthorized(self):
        """
        Ensure that cannot update user when unauthorized
        """
        url = reverse('users-detail', kwargs={'pk': 2})
        response = self.client.patch(url, {"first_name": "newName"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
      
    def test_delete_admin_user_by_admin_user(self):
        """
        Ensure that admin user can delete their own account
        """

        url = reverse('users-detail', kwargs={'pk': 1})
        self.client.cookies['auth_token'] = self.token.key
        response = self.client.delete(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.client.cookies['auth_token'] = None


    def test_delete_other_user_by_admin_user(self):
        """
        Ensure that admin user can delete other user
        """
        url = reverse('users-detail', kwargs={'pk': 2})
        self.client.cookies['auth_token'] = self.token.key
        response = self.client.delete(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        self.client.cookies['auth_token'] = None

    def test_delete_other_admin_user_by_admin_user(self):
        """
        Ensure that admin user can delete other admin user
        """
        url = reverse('users-detail', kwargs={'pk': 2})
        self.client.cookies['auth_token'] = self.token.key
        response = self.client.delete(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.client.cookies['auth_token'] = None


    def test_delete_regular_user_by_regular_user(self):
        """
        Ensure that regular user can delete their account
        """

        url = reverse('users-detail', kwargs={'pk': 2})
        self.client.cookies['auth_token'] = self.regular_user_token.key
        response = self.client.delete(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        self.client.cookies['auth_token'] = None

    def test_delete_other_regular_user_by_regular_user(self):
        """
        Ensure that regular user cannot delete other user
        """

        User.objects.create(
          email='anotherUser@gmail.com', 
          first_name='John',
          last_name='Calin',
          password='test978453442',
          username='another_user',
          groups=Group.objects.get(name=GROUPS[1])
        )

        url = reverse('users-detail', kwargs={'pk': 3})
        self.client.cookies['auth_token'] = self.regular_user_token.key
        response = self.client.delete(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.cookies['auth_token'] = None

    def test_delete_other_admin_user_by_regular_user(self):
        """
        Ensure that regular user cannot delete other admin user
        """

        User.objects.create(
          email='anotherUser@gmail.com', 
          first_name='John',
          last_name='Calin',
          password='test978453442',
          username='another_user',
          groups=Group.objects.get(name=GROUPS[0])
        )

        url = reverse('users-detail', kwargs={'pk': 3})
        self.client.cookies['auth_token'] = self.regular_user_token.key
        response = self.client.delete(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.cookies['auth_token'] = None

    def test_unauthorized_user_unauthorized(self):
        """
        Ensure that cannot delete user when unauthorized
        """
        url = reverse('users-detail', kwargs={'pk': 2})
        response = self.client.patch(url, {"first_name": "newName"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
