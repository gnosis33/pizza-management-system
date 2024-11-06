from django.shortcuts import render
from rest_framework import viewsets
from .models import Topping, Pizza
from .serializers import ToppingSerializer, PizzaSerializer

class ToppingViewSet(viewsets.ModelViewSet):
    queryset = Topping.objects.all()
    serializer_class = ToppingSerializer

class PizzaViewSet(viewsets.ModelViewSet):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
