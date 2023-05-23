from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404,redirect
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from blog.models import Post
from main.forms import SliderForm,SliderModalForm
from main.models import Slider
from .forms import PostForm,PostModalForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import (
    LoginRequiredMixin, UserPassesTestMixin
)
from bootstrap_modal_forms.generic import (
  BSModalDeleteView,
  BSModalUpdateView
)

@login_required(login_url='users:login')
def dashboard(request):
    template_name = 'dashboard/dashhome.html'
    posts = Post.objects.all().order_by('-created_at')
    context = {'posts':posts}
    return render(request, template_name, context)

@login_required(login_url='users:login')
def dashboard_post_list(request):
    template_name = 'dashboard/posts.html'
    posts = Post.objects.all().order_by('-created_at')
    context = {
        'posts':posts
    }
    return render(request, template_name, context)

@login_required(login_url='users:login')
def create_post(request):
    template_name = 'dashboard/create_post.html'
    if request.POST:
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post_obj = form.save(commit=False)
            post_obj.author_id = request.user.id
            post_obj.save()
            messages.success(request,'Post created successfully', extra_tags='alert alert-success')
            return redirect(to='dashboard:posts')
        else:
            messages.error(request, 'An error occured', extra_tags='alert alert-danger')
    else:
        form = PostForm()
    context = {'form':form}
    return render(request,template_name,context)

class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, BSModalUpdateView):
    model = Post
    template_name = 'dashboard/update_post.html'
    form_class = PostModalForm
    success_message = 'Success, Post was updated.'
    success_url = reverse_lazy('dashboard:posts')
    
    def test_func(self):
        if self.request.user.is_authenticated == True:
            return True
        return False

class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, BSModalDeleteView):
    model = Post
    template_name = 'dashboard/delete_post.html'
    success_message = 'Success, Post was deleted.'
    context_object_name = 'post'
    success_url = reverse_lazy('dashboard:posts')
    
    def test_func(self):
        if self.request.user.is_authenticated == True:
            return True
        return False
    
def portfolio_create(request):
    template_name = 'dashboard/create_portfolio.html'
    if request.POST:
        formSet = PortfolioFormSet(request.POST, request.FILES, prefix='portfolio')
        if formSet.is_valid():
            formSet.save()
            messages.success(request,'Uploaded successfully', extra_tags='alert alert-success')            
        else:
            messages.error(request, 'An error occured', extra_tags='alert alert-danger')
    else:
        formSet = PortfolioFormSet(prefix='portfolio')
    context = {'formset':formSet}
    return render(request,template_name,context)

def create_slider(request):
    if request.method=='POST':
        title = request.POST['title'],
        content = request.POST['content'],
        photo = request.FILES['photo']

        slider = Slider(
                title=title,
                content=content,
                photo=photo
            )
        slider.save()
        return redirect(to="dashboard:sliders")
    else:
        template_name = 'dashboard/create_slider.html'
        form = SliderForm()
        context = {'form':form}
        return render(request,template_name,context)

@login_required(login_url='users:login')
def dashboard_slider_list(request):
    template_name = 'dashboard/sliders.html'
    sliders = Slider.objects.all().order_by('-created_at')
    context = {
        'sliders':sliders
    }
    return render(request, template_name, context)

class SliderUpdateView(LoginRequiredMixin, UserPassesTestMixin, BSModalUpdateView):
    model = Slider
    template_name = 'dashboard/update_slider.html'
    form_class = SliderModalForm
    success_message = 'updated.'
    success_url = reverse_lazy('dashboard:sliders')
    
    def test_func(self):
        if self.request.user.is_authenticated == True:
            return True
        return False

class SliderDeleteView(LoginRequiredMixin, UserPassesTestMixin, BSModalDeleteView):
    model = Slider
    template_name = 'dashboard/delete_slider.html'
    success_message = 'Deleted.'
    context_object_name = 's'
    success_url = reverse_lazy('dashboard:sliders')
    
    def test_func(self):
        if self.request.user.is_authenticated == True:
            return True
        return False