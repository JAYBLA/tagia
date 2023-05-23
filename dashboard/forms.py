from django import forms
from blog.models import Post
from bootstrap_modal_forms.forms import BSModalModelForm


class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ['title', 'short_description', 'content','featured_image',]

class PostModalForm(BSModalModelForm):
    class Meta:
        model = Post
        fields = ['title','short_description', 'content','featured_image',]
        