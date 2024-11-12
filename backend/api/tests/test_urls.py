# backend/api/tests/test_urls.py

from django.urls import reverse, resolve
from rest_framework import status
from rest_framework.test import APITestCase
from api.views import ToppingViewSet, PizzaViewSet

class URLTests(APITestCase):
    def test_topping_url(self):
        url = reverse('topping-list')  # Ensure this matches your router's basename
        resolver = resolve(url)
        self.assertEqual(resolver.view_name, 'topping-list')
        self.assertEqual(resolver.func.cls, ToppingViewSet)

    def test_pizza_url(self):
        url = reverse('pizza-list')  # Ensure this matches your router's basename
        resolver = resolve(url)
        self.assertEqual(resolver.view_name, 'pizza-list')
        self.assertEqual(resolver.func.cls, PizzaViewSet)
