from django.urls import path, include
from rest_framework import routers
from .views import ToppingViewSet, PizzaViewSet

router = routers.DefaultRouter()
router.register(r'toppings', ToppingViewSet)
router.register(r'pizzas', PizzaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
