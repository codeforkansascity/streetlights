from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.utils import timezone
from django.utils.html import strip_tags
import os, json, datetime
from django.core.serializers import serialize

from .models import Pole
from . import dev_load
# Create your views here.
def index(request):
    return render(request, 'api/index.html')

def data(request):
    query_data = Pole.objects.values()
    return JsonResponse([entry for entry in query_data], safe=False)

def load_file(request):
    dev_load.load_mock()
    return JsonResponse({"success": "Yes"})