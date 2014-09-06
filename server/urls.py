from django.conf.urls import patterns, url

from server import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^post_metric$', views.post_metric, name='post_metric')
)
