from django.shortcuts import render_to_response, RequestContext


def home(request):
    return render_to_response('index.html', locals(), context_instance=RequestContext(request))

def blog(request):
    return render_to_response('article.html', locals(), context_instance=RequestContext(request))

def articles(request):
    return render_to_response('article_list.html', locals(), context_instance=RequestContext(request))