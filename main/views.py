from django.shortcuts import render, get_object_or_404
from django.contrib import messages
from django.http import JsonResponse
from .forms import ContactForm
from .models import Contact, Slider
from blog.models import Post
from django.core.paginator import Paginator
from django.core import mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

# Create your views here.
def home(request):
    template_name = 'main/home.html'
    # posts = Post.objects.all().order_by('-created_at')
    # paginator = Paginator(posts, 6)
    # page_number = request.GET.get('page')
    # page_obj = paginator.get_page(page_number)
    # sliders = Slider.objects.all().order_by('-created_at')
    # form = ContactForm()
    # context = {
    #     'form':form,
    #     'posts':page_obj,
    #     'sliders':sliders,
    # }
    return render(request,template_name)

def about(request):
    template_name = 'main/about.html'
    context = {}
    return render(request,template_name,context)

def news(request):
    template_name = 'main/news.html'
    context = {}
    return render(request,template_name,context)

def services(request):
    template_name = 'main/services.html'
    context = {}
    return render(request,template_name,context)

def shareholders(request):
    template_name = 'main/tagia-shareholders.html'
    context = {}
    return render(request,template_name,context)

def directors(request):
    template_name = 'main/tagia-directors.html'
    context = {}
    return render(request,template_name,context)

def shareholder_detail(request):
    template_name = 'main/shareholder-detail.html'
    context = {}
    return render(request,template_name,context)

def contact(request):
    template_name = 'main/contact.html'
    form = ContactForm()
    context = {'form':form}
    return render(request,template_name,context)

def process_contact(request):
    if request.is_ajax():
        if request.method == 'POST':
            full_name = request.POST['full_name'],
            phone = request.POST['phone_number'],            
            email = request.POST['email'],
            message = request.POST['message']
            
            contact = Contact(
                full_name=full_name,
                phone_number=phone,                
                email=email,
                message=message                
            )
            contact.save()
            subject = 'Tagia Website Contact Form'
            
            html_message = render_to_string('main/mail_template.html', {
                'full_name':full_name,                
                'email': email,
                'message': message,
                'phone':phone,
                
            })
            plain_message = strip_tags(html_message)
            from_email = "management@tagia.co.tz"
            recipient_list = ['info@tagia.co.tz',]            
            mail.send_mail(subject,plain_message, from_email, recipient_list, html_message=html_message,fail_silently=False,)

            return JsonResponse({'msg': 'success'}, safe=False)
        else:
            return JsonResponse({'msg': 'error'})
        
def post_detail(request, slug):
    template_name='main/post-detail.html'
    post = get_object_or_404(Post, slug=slug)
    posts = Post.objects.all().order_by('-created_at')
    context = {
        'post':post,
        'posts':posts,
    }
    return render(request, template_name,context)

def post_list(request):
    template_name='main/news.html'
    posts = Post.objects.all().order_by('-created_at')
    paginator = Paginator(posts, 9)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {
        'posts':page_obj,
    }
    return render(request, template_name,context)
    
            


