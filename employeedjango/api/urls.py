from django.urls import path,include
from .views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('contacts/', ContactListCreate.as_view(), name='contact-list-create'),
    path('contacts/<int:pk>/', ContactRetrieve.as_view(), name='contact-detail'),
    path('contacts/update/<int:pk>/', ContactUpdate.as_view(), name='contact-detail'),
    path('contacts/<int:pk>/delete/', ContactDestroy.as_view(), name='contact-delete'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
