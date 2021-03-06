from __future__ import unicode_literals

from django.conf.urls import patterns, url
from django.contrib.auth import views

urlpatterns = patterns('backend.views',

    url("^post/(.*)/$", 'post'),
    url("^comments/(.*)/$", 'comments'),
    url("^gbook/(.*)/$", 'gbook'),
    url("^users/(.*)/$", 'users'),
    url("^category/(.*)/$", 'category'),
    url("^profile/?$", 'profile'),
    # url("^login/?$", views.login, {'template_name': 'backend/login.html'}),
    url("^login/?$", 'login'),
    url("^logout/?$", views.logout_then_login, {'login_url': '/backend/login/'}),
    url("^imageUp/?$", 'postimage'),
    url("^$", 'index'),
)

