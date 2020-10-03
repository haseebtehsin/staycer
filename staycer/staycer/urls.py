from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('user.urls')),
    path('', include('certificate.urls')),
    path('', include('project.urls')),
    path('', include('metrics.urls')),
    path('admin/', admin.site.urls),
    path('favicon.ico', RedirectView.as_view(
        url=staticfiles_storage.url('favicon.ico')))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
