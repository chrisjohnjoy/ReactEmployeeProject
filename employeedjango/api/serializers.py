from rest_framework import serializers
from .models import Contact,CustomUser

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class CustomUserSerializer( serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'password')
