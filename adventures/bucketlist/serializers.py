from django.contrib.auth.models import User
from rest_framework import serializers

from bucketlist.models import Bucketlist, Item


class ItemSerializer(serializers.ModelSerializer):
    """Bucketlist Item Serializer"""
    bucketlist = serializers.ReadOnlyField(source='bucketlist.name')

    def validate_name(self, name):
        """Ensure no duplicate name"""
        bucketlist_id = self.context['view'].kwargs['pk']
        if self.context['request'].method == "POST" or self.context['request'].method == "PUT":
            if Item.objects.filter(name=name, bucketlist=bucketlist_id):
                raise serializers.ValidationError('item already exists in bucketlist')
        return name

    class Meta:
        model = Item
        fields = '__all__'

        read_only_fields = ('date_created', )


class BucketlistSerializer(serializers.ModelSerializer):
    """Bucketlist Serializer"""

    items = ItemSerializer(many=True, read_only=True)
    creator = serializers.ReadOnlyField(source='creator.username')

    def validate_name(self, name):
        """Ensure no duplicate name"""
        if self.context['request'].method == "POST" or self.context['request'].method == "PUT":
            if Bucketlist.objects.filter(name=name):
                raise serializers.ValidationError('bucketlist already exists')
        return name

    class Meta:
        model = Bucketlist
        fields = '__all__'

        read_only_fields = ('date_created',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
