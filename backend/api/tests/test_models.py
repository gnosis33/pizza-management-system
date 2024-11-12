# backend/api/tests/test_models.py

from django.test import TestCase
from django.db import IntegrityError
from api.models import Topping, Pizza

class ToppingModelTest(TestCase):
    def test_create_topping(self):
        topping = Topping.objects.create(name="Pepperoni")
        self.assertEqual(topping.name, "Pepperoni")
        self.assertEqual(str(topping), "Pepperoni")

    def test_unique_topping_name(self):
        Topping.objects.create(name="Mushrooms")
        with self.assertRaises(IntegrityError):
            Topping.objects.create(name="Mushrooms")

class PizzaModelTest(TestCase):
    def setUp(self):
        self.topping1 = Topping.objects.create(name="Cheese")
        self.topping2 = Topping.objects.create(name="Tomato")

    def test_create_pizza(self):
        pizza = Pizza.objects.create(name="Margherita")
        pizza.toppings.set([self.topping1, self.topping2])
        self.assertEqual(pizza.name, "Margherita")
        self.assertEqual(str(pizza), "Margherita")
        self.assertEqual(pizza.toppings.count(), 2)

    def test_unique_pizza_name(self):
        Pizza.objects.create(name="Pepperoni")
        with self.assertRaises(IntegrityError):
            Pizza.objects.create(name="Pepperoni")
