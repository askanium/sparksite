from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# from blog.models import Article
# from blog.models import Tag

# Create your views here.


def article_list(request):
    # posts = Article.objects.published()
    # paginator = Paginator(posts, 5)
    # page = request.GET.get('page')
    # try:
    #     article_page = paginator.page(page)
    # except PageNotAnInteger:
    #     # If page is not an integer, deliver first page.
    #     article_page = paginator.page(1)
    # except EmptyPage:
    #     # If page is out of range (e.g. 9999), deliver last page of results.
    #     article_page = paginator.page(paginator.num_pages)
    # return render(request, 'article_list.html', {'article_list': article_page})
    return render(request, 'article_list.html')


def article(request, slug):
    # post = get_object_or_404(Article, slug=slug)
    # posts = Article.objects.published()
    # tags = Tag.objects.all()
    # return render(request, 'article.html', {'article': post, 'tags': tags, 'article_list': posts})
    return render(request, 'article.html')

def tagged_articles(request, tag):
    # tagged_posts = Article.objects.published().filter(tags__name=tag)
    # return render(request, 'article_list.html', {'article_list': tagged_posts})
    return render(request, 'article_list.html')


def articles_by_author(request, fullname):
    # posts_by_author = Article.objects.articles_by_author(fullname).published()
    # return render(request, 'article_list.html', {'article_list': posts_by_author})
    return render(request, 'article_list.html')
