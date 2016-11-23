from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from bucketlist.tests.factories import (BucketlistFactory,
                                        UserFactory,
                                        ItemFactory)

# Create your tests here.


class RegisterApiTestSuite(APITestCase):
    def setUp(self):
        self.user = UserFactory.build()

    def test_user_can_register_with_correct_credentials(self):
        url = reverse('register')
        data = {'username': self.user.username,
                'email': self.user.email,
                'password': self.user.password}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn(
            '"username":"{}","email":"{}"'.format(
                self.user.username,
                self.user.email),
            str(response.content))

        # test_user_cant_register_twice
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn(
            '"username":["A user with that username already exists."]',
            str(response.content))

    def test_user_cant_register_with_wrong_credentials(self):
        url = reverse('register')
        data = {'username': self.user.username,
                'email': "wq",
                'password': self.user.password}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn(
            '"email":["Enter a valid email address."]',
            str(response.content))

    def test_user_cant_register_with_blank_credentials(self):
        url = reverse('register')
        data = {'username': ' ',
                'email': ' ',
                'password': ' '}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn(
            '"username":["This field may not be blank."]',
            str(response.content))


class LoginAPITestSuite(APITestCase):
    def setUp(self):
        self.user = UserFactory.build()
        url = reverse('register')
        data = {'username': self.user.username,
                'email': self.user.email,
                'password': self.user.password}
        self.client.post(url, data, format='json')
        self.url = reverse('login')
        self.data = {'username': self.user.username,
                     'password': self.user.password}

    def test_registered_user_can_login(self):
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('token', str(response.content))

    def test_login_with_blank_credentials(self):
        response = self.client.post(
            self.url,
            {'username': '', 'password': ''},
            format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn(
            '"username":["This field may not be blank."]',
            str(response.content))
        self.assertIn(
            '"password":["This field may not be blank."]',
            str(response.content))

    def test_login_with_wrong_credentials(self):
        response = self.client.post(self.url,
                                    {'username': 'loice', 'password': 'loice'},
                                    format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('Unable to login with provided credentials',
                      str(response.content))


class BucketlistAPITestSuite(APITestCase):
    def setUp(self):
        self.user = UserFactory.build()
        bucketlists = BucketlistFactory.build_batch(2)
        self.bucketlist1 = bucketlists[0]
        self.bucketlist2 = bucketlists[1]
        # register a user
        url = reverse('register')
        data = {'username': self.user.username,
                'email': self.user.email,
                'password': self.user.password}
        self.client.post(url, data, format='json')
        # login user
        self.login = self.client.login(
            username=self.user.username,
            password=self.user.password)

        # add one bucketlist
        self.data = {'name': self.bucketlist2.name,
                     'description': self.bucketlist2.description}
        self.client.post(reverse('bucketlists'), self.data, format='json')

    def test_user_can_create_bucketlist(self):
        url = reverse('bucketlists')
        data = {'name': self.bucketlist1.name,
                'description': self.bucketlist1.description}
        response = self.client.post(url, data, format='json')
        data = response.data
        self.assertTrue(self.login)
        self.assertIsNotNone(data['id'])
        self.assertEqual(data['name'], self.bucketlist1.name)

    def test_user_cant_create_bucketlist_with_same_name(self):
        response = self.client.post(reverse('bucketlists'),
                                    self.data,
                                    format='json')
        data = response.data
        self.assertEqual(data['name'], ["bucketlist already exists"])

    def test_can_list_bucketlists(self):
        response = self.client.get(reverse('bucketlists'))
        data = response.data
        self.assertEqual(response.status_code, 200)
        self.assertEqual(1, data['results'][0]['id'])

    def test_can_list_one_bucketlist(self):
        response = self.client.get(reverse('one_bucketlist', kwargs={'pk': 1}))
        data = response.data
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.bucketlist2.name, data['name'])

    def test_can_edit_one_bucketlist(self):
        response = self.client.put(
            reverse('one_bucketlist', kwargs={'pk': 1}),
            {'name': 'holiday',
             'description': self.bucketlist2.description},
            format='json')
        data = response.data
        self.assertEqual(response.status_code, 200)
        self.assertEqual('holiday', data['name'])

    def test_can_delete_one_bucketlist(self):
        response = self.client.delete(
            reverse('one_bucketlist', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 204)
        response = self.client.get(reverse('one_bucketlist', kwargs={'pk': 1}))
        data = response.data
        self.assertEqual(response.status_code, 404)
        self.assertEqual("Not found.", data["detail"])


class ItemAPITestSuite(APITestCase):
    def setUp(self):
        self.user = UserFactory.build()
        bucketlist = BucketlistFactory.build()
        items = ItemFactory.build_batch(2)
        self.item1 = items[0]
        self.item2 = items[1]
        # register a user
        url = reverse('register')
        data = {'username': self.user.username,
                'email': self.user.email,
                'password': self.user.password}
        self.client.post(url, data, format='json')
        # login user
        self.login = self.client.login(
            username=self.user.username,
            password=self.user.password)

        # add one bucketlist
        data = {'name': bucketlist.name,
                'description': bucketlist.description}
        self.bucketlist = self.client.post(
            reverse('bucketlists'), data, format='json')

        self.data = {'name': self.item1.name,
                     'description': self.item1.description,
                     'completed': self.item1.completed,
                     'bucketlist': self.bucketlist.data["id"]}
        self.client.post(reverse('items', kwargs={'pk': 1}),
                         self.data,
                         format='json')

    def test_user_can_create_item(self):
        url = reverse('items', kwargs={'pk': 1})
        data = {'name': self.item2.name,
                'description': self.item2.description,
                'completed': self.item2.completed,
                'bucketlist': self.bucketlist.data["id"]}
        response = self.client.post(url, data, format='json')
        data = response.data
        self.assertTrue(self.login)
        self.assertIsNotNone(data['id'])
        self.assertEqual(data['name'], self.item2.name)

    def test_user_cant_create_item_with_same_name_in_one_bucketlist(self):
        url = reverse('items', kwargs={'pk': 1})
        response = self.client.post(url, self.data, format='json')
        data = response.data
        self.assertEqual(data['name'], ["item already exists in bucketlist"])

    def test_can_list_bucketlist_items(self):
        url = reverse('items', kwargs={'pk': 1})
        response = self.client.get(url)
        data = response.data
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.item1.name, data['results'][0]['name'])

    def test_can_list_one_bucketlist_item(self):
        url = reverse('one_item', kwargs={'bucketlist_id': 1, 'pk': 1})
        response = self.client.get(url)
        data = response.data
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.item1.name, data['name'])

    def test_can_edit_one_bucketlist_item(self):
        url = reverse('one_item', kwargs={'bucketlist_id': 1, 'pk': 1})
        response = self.client.put(url,
                                   {'name': 'israel trip',
                                    'description': self.item1.description,
                                    'completed': self.item1.completed,
                                    'bucketlist': self.bucketlist.data["id"]},
                                   format='json')
        data = response.data
        self.assertEqual(response.status_code, 200)
        self.assertEqual('israel trip', data['name'])

    def test_can_delete_one_bucketlist(self):
        url = reverse('one_item', kwargs={'bucketlist_id': 1, 'pk': 1})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        response = self.client.get(url)
        data = response.data
        self.assertEqual(response.status_code, 404)
        self.assertEqual("Not found.", data["detail"])
