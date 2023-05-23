from django.shortcuts import render,get_object_or_404
from .models import Post
from django.core.paginator import Paginator


def all_posts(request):
    template_name = 'blog/bloghome.html'
    posts = Post.objects.all().order_by('-created_at')
    paginator = Paginator(posts, 6)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {'posts':page_obj}
    return render(request, template_name, context)

def post_detail(request,slug):
    post = get_object_or_404(Post,slug=slug)
    template_name = 'blog/post_detail.html'
    context ={
        'post':post
    }
    return render(request,template_name,context)
