from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from django.utils.text import slugify
from django.urls import reverse
from uuid import uuid4
from users.models import User
from django_resized import ResizedImageField


class Post(models.Model):
    author =models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    short_description = models.CharField(max_length=250)  
    content = RichTextField(blank=False)
    featured_image = ResizedImageField(quality=72, upload_to='posts/featured_images') 
    slug = models.SlugField(default='', max_length=250, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    


    def __str__(self):
        return str(self.title)

    def get_absolute_url(self):
        kwargs = {
            'post_slug': self.slug
        }
        return reverse('main:post_detail', kwargs=kwargs)
    def save(self, *args, **kwargs):
        self.slug = str(uuid4()) + "-" + slugify(self.title)
        return super().save(*args, **kwargs)

