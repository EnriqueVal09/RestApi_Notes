from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Book, Publisher
from .serializer import BookSerializer, PublisherSerializer

class BookListCreate(generics.ListCreateAPIView):
    serializer_class = BookSerializer
    permission_classes = (AllowAny,)
    queryset = Book.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class BookDelete(generics.DestroyAPIView):
    serializer_class = BookSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Book.objects.all()

class BookUpdate(generics.UpdateAPIView):
    serializer_class = BookSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Book.objects.all()

    def perform_update(self, serializer):
        serializer.save()

class PublisherListCreate(generics.CreateAPIView):
    serializer_class = PublisherSerializer
    permission_classes = (AllowAny,)
    queryset = Publisher.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class PublisherDelete(generics.DestroyAPIView):
    serializer_class = PublisherSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Publisher.objects.all()

class PublisherUpdate(generics.UpdateAPIView):
    serializer_class = PublisherSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Publisher.objects.all()

    def perform_update(self, serializer):
        serializer.save()
    