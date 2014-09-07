from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'home/index.html', {})

def map(request):
    return render(request, 'home/map.html', {})

def about(request):
    return render(request, 'home/about.html', {})

def mapTest(request):
    return render(request, 'home/chill.html', {})