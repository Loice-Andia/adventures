from django.contrib import admin

from bucketlist.models import Bucketlist, Item


admin.site.register((Bucketlist, Item))
