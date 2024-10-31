from django.db import models

class Publisher(models.Model):
    name = models.CharField(max_length=100)
    website = models.URLField(max_length=200)

    def __str__(self):
        return self.name
    
class Book(models.Model):
    title = models.CharField(max_length=200)
    publication_date = models.DateField()
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)

    def __str__(self):
        return self.title