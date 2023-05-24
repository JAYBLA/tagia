from django import forms
from .models import Contact, Slider

from bootstrap_modal_forms.forms import BSModalModelForm


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['full_name', 'phone_number','email','message',]

class SliderForm(forms.ModelForm):
    class Meta:
        model = Slider
        fields = ['title', 'content','photo',]


class SliderModalForm(BSModalModelForm):
    class Meta:
        model = Slider
        fields = ['title', 'content','photo',]