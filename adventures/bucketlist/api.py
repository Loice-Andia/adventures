from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
# from rest_framework_swagger.views import get_swagger_view

from bucketlist.models import Bucketlist, Item
from bucketlist.serializers import (BucketlistSerializer,
    ItemSerializer,
    UserSerializer)
from bucketlist.permissions import IsOwnerOrReadOnly


# schema_view = get_swagger_view(title='Adventures API')


class UserRegister(generics.CreateAPIView):
    """For /api/v1/auth/register url path"""
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BucketlistList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]
    queryset = Bucketlist.objects.all()
    serializer_class = BucketlistSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class BucketlistDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly]
    queryset = Bucketlist.objects.all()
    serializer_class = BucketlistSerializer


class ItemList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ItemSerializer

    def get_bucketlist(self):
        return get_object_or_404(Bucketlist, pk=self.kwargs['pk'])

    def get_queryset(self):
        return Item.objects.filter(bucketlist=self.get_bucketlist())


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ItemSerializer

    def get_bucketlist(self):
        return get_object_or_404(Bucketlist, pk=self.kwargs['bucketlist_id'])

    def get_queryset(self):
        queryset = Item.objects.filter(
            bucketlist=self.get_bucketlist()).all()
        return queryset
