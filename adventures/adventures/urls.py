from django.conf.urls import include, url
from django.contrib import admin

from bucketlist import urls as api_urls
from bucketlist import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(api_urls)),
    url(r'^api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'^', views.IndexView.as_view(), name="home"),
]
