from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('apps.accounts.urls')),
    path('notes/', include('apps.notes.urls')),
    path('books/', include('apps.books.urls')),
]
