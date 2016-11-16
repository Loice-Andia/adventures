from django.contrib.auth.models import User
from django.db import models


class TimeStampMixin(models.Model):
    """
    This mixin defines the date_created and
    date_modified attributes for each model.
    """
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Bucketlist(TimeStampMixin):
    """
    This class contains the database schema of the Bucketlists
    i.e. Table and Columns"""

    name = models.CharField(max_length=100, null=False, unique=True)
    description = models.TextField(max_length=1000)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_by')

    def __str__(self):
        return '{}({})\n{}'.format(self.name,
                                   self.date_created,
                                   self.description)

    class Meta:
        ordering = ['name']
