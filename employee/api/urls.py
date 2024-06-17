from django.urls import path
from .views import ContactListCreate, ContactRetrieve, ContactUpdate, ContactDestroy

urlpatterns = [
    path('contacts/', ContactListCreate.as_view(), name='contact-list-create'),
    path('contacts/<int:pk>/', ContactRetrieve.as_view(), name='contact-detail'),
    path('contacts/update/<int:pk>/', ContactUpdate.as_view(), name='contact-detail'),
    path('contacts/<int:pk>/delete/', ContactDestroy.as_view(), name='contact-delete'),
]
