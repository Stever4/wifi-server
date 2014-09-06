from django.shortcuts import render

from server.models import *
# Create your views here.

def index(request):
    metrics = Metric.objects.all()

    context = {'metrics': metrics}
    print(metrics)
    return render(request, 'server/index.html', context)

