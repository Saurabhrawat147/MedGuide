from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, SymptomSession

class UserSerializer(serializers.ModelSerializer):
    gender = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'gender']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        gender = validated_data.pop('gender', None)
        user = User.objects.create_user(**validated_data)
        if gender:
            UserProfile.objects.create(user=user, gender=gender)
        return user

class SymptomSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SymptomSession
        fields = '__all__'
