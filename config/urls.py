from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include



urlpatterns = [
    path('', include('main.urls', namespace='main')),
    path('superuser/', admin.site.urls),
    path('users/', include('users.urls')),
    path('admin/', include('dashboard.urls', namespace='dashboard')),
    path('blog/', include('blog.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
