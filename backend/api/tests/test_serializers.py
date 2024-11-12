# backend/api/tests/test_serializers.py

from django.test import TestCase
from api.models import Topping, Pizza
from api.serializers import ToppingSerializer, PizzaSerializer

class ToppingSerializerTest(TestCase):
    def setUp(self):
        self.topping1 = Topping.objects.create(name="Olives")

    def test_valid_topping_serializer(self):
        data = {'name': 'Pepperoni'}
        serializer = ToppingSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        topping = serializer.save()
        self.assertEqual(topping.name, 'Pepperoni')

    def test_duplicate_topping_name(self):
        data = {'name': 'olives'}  # Different case to test case-insensitive uniqueness
        serializer = ToppingSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        self.assertEqual(serializer.errors['name'][0], "This topping already exists.")

class PizzaSerializerTest(TestCase):
    def setUp(self):
        self.topping1 = Topping.objects.create(name="Cheese")
        self.topping2 = Topping.objects.create(name="Tomato")
        self.pizza1 = Pizza.objects.create(name="Margherita")
        self.pizza1.toppings.set([self.topping1, self.topping2])

    def test_valid_pizza_serializer(self):
        data = {
            'name': 'Pepperoni',
            'topping_ids': [self.topping1.id, self.topping2.id]
        }
        serializer = PizzaSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        pizza = serializer.save()
        self.assertEqual(pizza.name, 'Pepperoni')
        self.assertEqual(pizza.toppings.count(), 2)

    def test_duplicate_pizza_name(self):
        data = {
            'name': 'margherita',  # Different case to test case-insensitive uniqueness
            'topping_ids': [self.topping1.id]
        }
        serializer = PizzaSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        self.assertEqual(serializer.errors['name'][0], "This pizza already exists.")

    def test_invalid_topping_ids(self):
        data = {
            'name': 'Hawaiian',
            'topping_ids': [999]  # Assuming 999 does not exist
        }
        serializer = PizzaSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('topping_ids', serializer.errors)
