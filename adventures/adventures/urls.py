from django.conf.urls import include, url
from django.contrib import admin

from bucketlist import urls

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(urls)),
]
