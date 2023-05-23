from django.urls import path
from .views import *


app_name ='blog'

urlpatterns = [
    path('news/', all_posts, name='news_list'),
    path('post/<str:slug>/',post_detail,name='post_detail')
]