from django.conf.urls import include, url
from blog import views

urlpatterns = [
    url(r'^articles/$', views.article_list, name='article_list'),
    url(r'^(?P<slug>[\w-]+)/$', views.article, name='article'),
    url(r'^articles/(?P<tag>[\w-]+)/$', views.tagged_articles, name='tag'),
    url(r'^author/(?P<fullname>[\w-]+)/$', views.articles_by_author, name='author'),

]

