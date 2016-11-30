from django.shortcuts import redirect
from django.views.generic import TemplateView
from django.contrib import messages
from django.template import RequestContext


class IndexView(TemplateView):
    signup_active = False
    template_name = 'index.html'

    def dispatch(self, request, *args, **kwargs):
        return super(IndexView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        return context
