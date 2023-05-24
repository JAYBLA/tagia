from django.db import models
from ckeditor.fields import RichTextField

class Contact(models.Model):    
    full_name = models.CharField(max_length=180)
    phone_number = models.CharField(max_length=12)    
    email = models.EmailField()
    message = models.TextField()
    created_at =models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.first_name

class Slider(models.Model):
    title = models.CharField(max_length=200)
    content = RichTextField(blank=False)
    photo = models.ImageField(upload_to='slider/images')
    created_at =models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.first_name
    
    
    
    
