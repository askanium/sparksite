from django.shortcuts import render, render_to_response, RequestContext
# from blog.models import Article


# def home(request):
#     return render_to_response('index.html', locals(), context_instance=RequestContext(request))

def blog(request):
    return render_to_response('article.html', locals(), context_instance=RequestContext(request))

def articles(request):
    return render_to_response('article_list.html', locals(), context_instance=RequestContext(request))

def home(request):
    # posts = Article.objects.posts_summary()
    posts = []
    return render(request, 'index.html', {'articles_for_summary': posts})
