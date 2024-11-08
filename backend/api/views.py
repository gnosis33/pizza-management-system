from django.shortcuts import render
from rest_framework import viewsets
from .models import Topping, Pizza
from .serializers import ToppingSerializer, PizzaSerializer

# ViewSet for handling CRUD operations on Toppings
class ToppingViewSet(viewsets.ModelViewSet):
    queryset = Topping.objects.all() # Query all toppings from the database
    serializer_class = ToppingSerializer # Use ToppingSerializer for serialization

# ViewSet for handling CRUD operations on Pizzas
class PizzaViewSet(viewsets.ModelViewSet):
    queryset = Pizza.objects.all() # Query all pizzas from the database
    serializer_class = PizzaSerializer # Use PizzaSerializer for serialization
