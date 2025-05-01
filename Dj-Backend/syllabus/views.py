from django.shortcuts import render
from .models import *
from rest_framework import viewsets
from .serializers import *
# Create your views here.

class SyllabusView(viewsets.ModelViewSet):
    queryset = Syllabus.objects.all()
    serializer_class = SyllabusSerializer
