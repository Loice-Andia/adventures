from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_swagger.views import get_swagger_view
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from bucketlist.models import Bucketlist, Item
from bucketlist.serializers import (BucketlistSerializer,
                                    ItemSerializer,
                                    UserSerializer)
from bucketlist.permissions import IsOwnerOrReadOnly

schema_view = get_swagger_view(title='Adventures API')


class UserRegister(viewsets.ModelViewSet):
    """For /api/v1/auth/register url path"""
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BucketlistViewSet(viewsets.ModelViewSet):
    authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated,
                          IsOwnerOrReadOnly]
    serializer_class = BucketlistSerializer

    def get_queryset(self):
        return Bucketlist.objects.filter(creator=self.request.user).all()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class ItemlistViewSet(viewsets.ModelViewSet):
    authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ItemSerializer

    def get_bucketlist(self):
        return get_object_or_404(Bucketlist, pk=self.kwargs['bucketlist_id'])

    def get_queryset(self):
        return Item.objects.filter(bucketlist=self.get_bucketlist())

    def perform_create(self, serializer):
        serializer.save(bucketlist=self.get_bucketlist())
