import factory

from bucketlist.models import Bucketlist, Item
from django.contrib.auth.models import User


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: "trialuser%d" % n)
    email = factory.LazyAttribute(
        lambda a: '{0}@gmail.com'.format(
            a.username.replace(' ', '')).lower())
    password = factory.LazyAttribute(
        lambda a: '{0}'.format(
            a.username.replace(' ', '')))


class BucketlistFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Bucketlist

    name = factory.Sequence(lambda n: "Test_bucketlist %d" % n)
    description = 'This is a test bucketlist'
    creator = factory.SubFactory(UserFactory)

    @factory.post_generation
    def users(self, create, extracted, **kwargs):
        if extracted:
            for user in extracted:
                self.creator.add(user)


class ItemFactory(factory.django.DjangoModelFactory):
    class Meta(object):
        model = Item

    name = factory.Sequence(lambda n: "Test_item %d" % n)
    description = 'This is a test bucketlist item'
    completed = False
    bucketlist = factory.SubFactory(BucketlistFactory)
