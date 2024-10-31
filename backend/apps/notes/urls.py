from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('create/', views.NoteListCreate.as_view(), name='create_note'),
    path('delete/<int:pk>/', views.NoteDelete.as_view(), name='delete_note'),
    path('update/<int:pk>/', views.NoteUpdate.as_view(), name='update_note'),
]
