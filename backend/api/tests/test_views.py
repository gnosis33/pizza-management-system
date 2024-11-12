# backend/api/tests/test_views.py

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import Topping, Pizza

class ToppingViewSetTest(APITestCase):
    def setUp(self):
        self.topping1 = Topping.objects.create(name="Cheese")
        self.topping2 = Topping.objects.create(name="Tomato")
        self.url = reverse('topping-list')  # This assumes your router's basename is 'topping'

    def test_get_toppings(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_topping(self):
        data = {'name': 'Pepperoni'}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Topping.objects.count(), 3)
        self.assertEqual(Topping.objects.get(id=response.data['id']).name, 'Pepperoni')

    def test_create_duplicate_topping(self):
        data = {'name': 'cheese'}  # Different case to test case-insensitive uniqueness
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)

    def test_update_topping(self):
        data = {'name': 'Mozzarella'}
        url = reverse('topping-detail', args=[self.topping1.id])
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.topping1.refresh_from_db()
        self.assertEqual(self.topping1.name, 'Mozzarella')

    def test_delete_topping(self):
        url = reverse('topping-detail', args=[self.topping1.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Topping.objects.count(), 1)

class PizzaViewSetTest(APITestCase):
    def setUp(self):
        self.topping1 = Topping.objects.create(name="Cheese")
        self.topping2 = Topping.objects.create(name="Tomato")
        self.pizza1 = Pizza.objects.create(name="Margherita")
        self.pizza1.toppings.set([self.topping1, self.topping2])
        self.url = reverse('pizza-list')  # This assumes your router's basename is 'pizza'

    def test_get_pizzas(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Margherita')
        self.assertEqual(len(response.data[0]['toppings']), 2)

    def test_create_pizza(self):
        data = {
            'name': 'Pepperoni',
            'topping_ids': [self.topping1.id]
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Pizza.objects.count(), 2)
        pizza = Pizza.objects.get(id=response.data['id'])
        self.assertEqual(pizza.name, 'Pepperoni')
        self.assertEqual(pizza.toppings.count(), 1)

    def test_create_duplicate_pizza(self):
        data = {
            'name': 'margherita',  # Different case to test case-insensitive uniqueness
            'topping_ids': [self.topping1.id]
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)

    def test_create_pizza_with_invalid_topping(self):
        data = {
            'name': 'Hawaiian',
            'topping_ids': [999]  # Assuming 999 does not exist
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('topping_ids', response.data)

    def test_update_pizza(self):
        data = {
            'name': 'Veggie',
            'topping_ids': [self.topping2.id]
        }
        url = reverse('pizza-detail', args=[self.pizza1.id])
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.pizza1.refresh_from_db()
        self.assertEqual(self.pizza1.name, 'Veggie')
        self.assertEqual(self.pizza1.toppings.count(), 1)

    def test_delete_pizza(self):
        url = reverse('pizza-detail', args=[self.pizza1.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Pizza.objects.count(), 0)
