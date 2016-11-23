from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework.urlpatterns import format_suffix_patterns

from bucketlist.api import (BucketlistList, BucketlistDetail,
                            ItemDetail, ItemList,
                            UserRegister)


urlpatterns = [
    url(r'^login/', obtain_jwt_token, name='login'),
    url(r'^register/$', UserRegister.as_view(), name='register'),
    url(r'^bucketlists/$', BucketlistList.as_view(), name='bucketlists'),
    url(r'^bucketlists/(?P<pk>[0-9]+)/$',
        BucketlistDetail.as_view(), name='one_bucketlist'),
    url(r'^bucketlists/(?P<pk>[0-9]+)/items/$',
        ItemList.as_view(), name='items'),
    url(r'^bucketlists/(?P<bucketlist_id>[0-9]+)/items/(?P<pk>[0-9]+)$',
        ItemDetail.as_view(), name='one_item'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
