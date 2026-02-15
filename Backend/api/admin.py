from django.contrib import admin
from .models import UserProfile, SymptomSession

admin.site.register(UserProfile)
admin.site.register(SymptomSession)
