from django.conf.urls import patterns, url

from home import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^about$', views.about, name='about'),
    url(r'^map$', views.map, name='map'),
    url(r'^mapTest$', views.mapTest, name='mapTest'),
)
