from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from ..models import Topping, Pizza

class ToppingAPITest(APITestCase):

    def setUp(self):
        self.topping_url = reverse('topping-list')  # Adjust the URL name accordingly
        self.topping_detail_url = lambda pk: reverse('topping-detail', kwargs={'pk': pk})

    def test_create_topping(self):
        data = {'name': 'Cheese'}
        response = self.client.post(self.topping_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Topping.objects.count(), 1)
        self.assertEqual(Topping.objects.get().name, 'Cheese')

    def test_create_duplicate_topping(self):
        Topping.objects.create(name='Cheese')
        data = {'name': 'Cheese'}
        response = self.client.post(self.topping_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)
        self.assertEqual(Topping.objects.count(), 1)

    # Additional tests for GET, PUT, DELETE

class PizzaAPITest(APITestCase):

    def setUp(self):
        self.pizza_url = reverse('pizza-list')  # Adjust the URL name accordingly
        self.pizza_detail_url = lambda pk: reverse('pizza-detail', kwargs={'pk': pk})
        self.topping1 = Topping.objects.create(name='Cheese')
        self.topping2 = Topping.objects.create(name='Tomato')

    def test_create_pizza(self):
        data = {
            'name': 'Margherita',
            'toppings': [self.topping1.id, self.topping2.id]
        }
        response = self.client.post(self.pizza_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pizza.objects.count(), 1)
        self.assertEqual(Pizza.objects.get().name, 'Margherita')

    def test_create_duplicate_pizza(self):
        Pizza.objects.create(name='Margherita')
        data = {'name': 'Margherita'}
        response = self.client.post(self.pizza_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)
        self.assertEqual(Pizza.objects.count(), 1)

    # Additional tests for GET, PUT, DELETE
