from datetime import date
from rest_framework import serializers
from .models import Item, CheckIn
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.db import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email']

class ItemSerializer(serializers.ModelSerializer):
    is_checked_today = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'is_checked_today']
    
    def get_is_checked_today(self, obj):
        today = date.today()
        return obj.check_ins.filter(
            check_in_time__date=today,
            status=True
        ).exists()

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user
        return super().create(validated_data)
    

class CheckInSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckIn
        fields = '__all__'