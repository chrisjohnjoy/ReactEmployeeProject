from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *

class ContactListCreate(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class ContactRetrieve(generics.RetrieveAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class ContactUpdate(generics.RetrieveUpdateAPIView):

    queryset=Contact.objects.all()
    serializer_class=ContactSerializer

class ContactDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class RegisterView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class LoginView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserLoginSerializer

    