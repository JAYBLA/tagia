from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.home,name='site-home'),    
    path('contact/', views.contact,name='contact'),
    path('news/', views.news,name='news'),
    path('services/', views.services,name='services'),
    path('shareholders/', views.shareholders,name='shareholders'),
    path('directors/', views.directors,name='directors'),
    path('shareholder-detail/', views.shareholder_detail,name='shareholder-detail'),
    path('ajax-contact/', views.process_contact, name='contact_post'),
    path('about/', views.about,name='about'),
    path('post/<str:slug>/', views.post_detail,name='post_detail'),
    path('news-and-events/', views.post_list, name="news")
    
]