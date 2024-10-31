from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'title', 'content', 'owner')
        extra_kwargs = {'owner': {'read_only': True}}