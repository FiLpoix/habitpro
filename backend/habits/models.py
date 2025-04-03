# Create your models here.
from django.db import models
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.models import User
from django.utils.timezone import now

# Item Model
class Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habits')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class CheckIn(models.Model):
    habit = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='check_ins')
    check_in_time = models.DateTimeField(default=now)
    location = models.CharField(max_length=255, blank=True, null=True)
    status = models.BooleanField(default=False)