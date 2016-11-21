from django.core.exceptions import ObjectDoesNotExist
from django.test import TestCase

from bucketlist.models import Bucketlist, Item
from bucketlist.tests.factories import BucketlistFactory, ItemFactory, UserFactory


class BucketlistModelTestSuite(TestCase):
    def setUp(self):
        self.user = UserFactory()
        bucketlist = BucketlistFactory.build_batch(2)
        self.bucketlist1 = bucketlist[0]
        self.bucketlist2 = bucketlist[1]
        self.bucketlist = Bucketlist.objects.create(
            name=self.bucketlist2.name,
            description=self.bucketlist2.description,
            creator=self.user)

    def test_can_create_bucketlist(self):
        self.assertRaises(
            ObjectDoesNotExist,
            Bucketlist.objects.get,
            name=self.bucketlist1.name
        )
        bucketlist = Bucketlist.objects.create(
            name=self.bucketlist1.name,
            description=self.bucketlist1.description,
            creator=self.user)
        self.assertIsNotNone(bucketlist.id)

    def test_can_read_bucketlist(self):
        bucketlist = Bucketlist.objects.get(name=self.bucketlist2.name)
        self.assertEqual(self.bucketlist2.name, bucketlist.name)

    def test_can_update_bucketlist(self):
        bucketlist = Bucketlist.objects.get(name=self.bucketlist2.name)
        self.assertEqual(self.bucketlist2.name, bucketlist.name)
        bucketlist.name = "holiday"
        bucketlist.save()
        bucketlist = Bucketlist.objects.get(name="holiday")
        self.assertEqual(bucketlist.id, self.bucketlist.id)
        self.assertEqual(bucketlist.name, "holiday")

    def test_can_delete_bucketlist(self):
        bucketlist = Bucketlist.objects.get(name=self.bucketlist2.name)
        self.assertEqual(self.bucketlist2.name, bucketlist.name)
        bucketlist.delete()
        self.assertRaises(
            ObjectDoesNotExist,
            Bucketlist.objects.get,
            pk=self.bucketlist.id
        )


class ItemModelTestSuite(TestCase):
    def setUp(self):
        self.bucketlist = BucketlistFactory()
        item = ItemFactory.build_batch(2)
        self.item1 = item[0]
        self.item2 = item[1]
        self.item = Item.objects.create(
            name=self.item1.name,
            description=self.item1.description,
            completed=self.item1.completed,
            bucketlist=self.bucketlist)

    def test_can_create_item(self):
        self.assertRaises(
            ObjectDoesNotExist,
            Item.objects.get,
            name=self.item2.name
        )
        item = Item.objects.create(
            name=self.item2.name,
            description=self.item2.description,
            completed=self.item1.completed,
            bucketlist=self.bucketlist)
        self.assertIsNotNone(item.id)

    def test_can_read_item(self):
        item = Item.objects.get(name=self.item1.name)
        self.assertEqual(self.item1.name, item.name)

    def test_can_update_bucketlist(self):
        item = Item.objects.get(name=self.item1.name)
        self.assertEqual(self.item1.name, item.name)
        item.name = "scuba diving"
        item.save()
        item = Item.objects.get(name="scuba diving")
        self.assertEqual(item.id, self.item.id)
        self.assertEqual(item.name, "scuba diving")

    def test_can_delete_bucketlist(self):
        item = Item.objects.get(name=self.item1.name)
        self.assertEqual(self.item1.name, item.name)
        item.delete()
        self.assertRaises(
            ObjectDoesNotExist,
            Item.objects.get,
            pk=self.item.id
        )
