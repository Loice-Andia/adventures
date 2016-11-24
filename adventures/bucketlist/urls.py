from django.conf.urls import include, url
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_nested import routers
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_swagger.views import get_swagger_view

from bucketlist.api import (BucketlistViewSet, ItemlistViewSet,
                            UserRegister)

schema_view = get_swagger_view(title='Adventures API')


# Create a router and register our viewsets with it.
router = routers.DefaultRouter()
router.register(r'bucketlists', BucketlistViewSet)

item_router = routers.NestedSimpleRouter(router, r'bucketlists', lookup='bucketlist')
item_router.register(r'items', ItemlistViewSet, base_name='items')


urlpatterns = [
    url(r'^login/', obtain_jwt_token, name='login'),
    url(r'^register/', UserRegister.as_view({'post': 'create'}), name='register'),
    url(r'^bucketlists/$',
        BucketlistViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='bucketlists'),
    url(r'^bucketlists/(?P<pk>[0-9]+)/$',
        BucketlistViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy'}),
        name='one_bucketlist'),
    url(r'^bucketlists/(?P<pk>[0-9]+)/items/$',
        ItemlistViewSet.as_view({'get': 'list', 'post': 'create'}), name='items'),
    url(r'^bucketlists/(?P<bucketlist_id>[0-9]+)/items/(?P<pk>[0-9]+)$',
        ItemlistViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy'}), name='one_item'),
    url(r'^$', schema_view),
]

urlpatterns = format_suffix_patterns(urlpatterns)
