# models.py

from django.db import models

class Note(models.Model):
    id=models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
   
    def __str__(self):
        return self.title
