from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

    url(r'^$', 'uplus.views.home', name='home'),
    url(r'^product$', 'uplus.views.product', name='product'),
    url(r'^service$', 'uplus.views.service', name='service'),
    url(r'^about$', 'uplus.views.about', name='about'),
    url(r'^detail', 'uplus.views.detail', name='detail'),
    
    url(r'^register$', 'uplus.views.register', name='register'),
    url(r'^article', 'uplus.views.article', name='article'),
    url(r'^template$', 'uplus.views.template', name='template'),
    url(r'^feedback', 'uplus.views.feedback', name='feedback'),
    
    url(r'^backend/', include('backend.urls')),

    url(r'^admin/', include(admin.site.urls)),
    
)
