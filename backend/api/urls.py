from django.urls import path, include
from rest_framework import routers
from .views import ToppingViewSet, PizzaViewSet

# Create a router and register the viewsets for Toppings and Pizzas
router = routers.DefaultRouter()
router.register(r'toppings', ToppingViewSet)
router.register(r'pizzas', PizzaViewSet)

# Define the URL patterns using the router
urlpatterns = [
    path('', include(router.urls)),
]
