from .models import *
from rest_framework import serializers

class SyllabusSerializer(serializers.ModelSerializer):
    class Meta:
        model= Syllabus
        fields = '__all__'

