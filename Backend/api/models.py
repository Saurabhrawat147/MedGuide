from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female')])
    created_at = models.DateTimeField(auto_now_add=True)

class SymptomSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    symptoms = models.JSONField()
    severity = models.CharField(max_length=20)
    duration = models.CharField(max_length=50)
    age_group = models.CharField(max_length=20)
    conditions = models.JSONField(default=list)
    health_status = models.JSONField(default=list)
    results = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
