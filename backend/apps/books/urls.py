from django.urls import path
from . import views

urlpatterns = [
    path('create-book/', views.BookListCreate.as_view(), name='create_book'),
    path('delete-book/<int:pk>/', views.BookDelete.as_view(), name='delete_book'),
    path('update-book/<int:pk>/', views.BookUpdate.as_view(), name='update_book'),
    path('create-publisher/', views.PublisherListCreate.as_view(), name='create_publisher'),
    path('delete-publisher/<int:pk>/', views.PublisherDelete.as_view(), name='delete_publisher'),
    path('update-publisher/<int:pk>/', views.PublisherUpdate.as_view(), name='update_publisher'),
]