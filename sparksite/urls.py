from django.conf.urls import patterns, include, url
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin

urlpatterns = patterns('',
   (r'^i18n/', include('django.conf.urls.i18n')),
)

urlpatterns += patterns('',
    # Examples:
    url(r'^$', 'landing_page.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
