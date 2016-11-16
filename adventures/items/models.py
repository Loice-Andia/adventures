from django.db import models

from adventures.bucketlists.models import Bucketlist, TimeStampMixin


class Item(TimeStampMixin):
    """
    This class contains the database schema of the Items
    i.e. Table and Columns"""

    name = models.CharField(max_length=100, null=False, unique=True)
    description = models.TextField(max_length=1000)
    completed = models.BooleanField(default=False)
    bucketlist = models.ForeignKey(
        Bucketlist,
        on_delete=models.CASCADE,
        related_name='bucketlist_name')

    def __str__(self):
        return "{} item added to {} bucketlist".format(
            self.name,
            self.bucketlist.name)
