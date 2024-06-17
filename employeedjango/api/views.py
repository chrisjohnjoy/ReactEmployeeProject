from django.shortcuts import render
from rest_framework import generics
from .models import Contact
from .serializers import ContactSerializer

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
