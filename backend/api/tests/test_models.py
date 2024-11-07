from django.test import TestCase
from django.db import IntegrityError
from ..models import Topping, Pizza

class ToppingModelTest(TestCase):

    def test_create_topping(self):
        # Create
        topping = Topping.objects.create(name='Cheese')
        self.assertEqual(topping.name, 'Cheese')

    def test_read_topping(self):
        # Create
        Topping.objects.create(name='Pepperoni')
        # Read
        topping = Topping.objects.get(name='Pepperoni')
        self.assertEqual(topping.name, 'Pepperoni')

    def test_update_topping(self):
        # Create
        topping = Topping.objects.create(name='Mushroom')
        # Update
        topping.name = 'Mushrooms'
        topping.save()
        # Read Updated
        updated_topping = Topping.objects.get(pk=topping.pk)
        self.assertEqual(updated_topping.name, 'Mushrooms')

    def test_delete_topping(self):
        # Create
        topping = Topping.objects.create(name='Onion')
        # Delete
        topping.delete()
        # Confirm Deletion
        with self.assertRaises(Topping.DoesNotExist):
            Topping.objects.get(pk=topping.pk)

    def test_duplicate_topping(self):
        # Create
        Topping.objects.create(name='Cheese')
        # Attempt to Create Duplicate
        with self.assertRaises(IntegrityError):
            Topping.objects.create(name='Cheese')

class PizzaModelTest(TestCase):

    def setUp(self):
        # Create Toppings
        self.cheese = Topping.objects.create(name='Cheese')
        self.tomato = Topping.objects.create(name='Tomato')

    def test_create_pizza(self):
        # Create
        pizza = Pizza.objects.create(name='Margherita')
        pizza.toppings.set([self.cheese, self.tomato])
        self.assertEqual(pizza.name, 'Margherita')
        self.assertEqual(list(pizza.toppings.all()), [self.cheese, self.tomato])

    def test_read_pizza(self):
        # Create
        pizza = Pizza.objects.create(name='Margherita')
        pizza.toppings.set([self.cheese, self.tomato])
        # Read
        pizza = Pizza.objects.get(name='Margherita')
        self.assertEqual(pizza.name, 'Margherita')
        self.assertEqual(list(pizza.toppings.all()), [self.cheese, self.tomato])

    def test_update_pizza(self):
        # Create
        pizza = Pizza.objects.create(name='Margherita')
        pizza.toppings.set([self.cheese])
        # Update
        pizza.name = 'Four Cheese'
        new_topping = Topping.objects.create(name='Gorgonzola')
        pizza.toppings.add(new_topping)
        pizza.save()
        # Read Updated
        updated_pizza = Pizza.objects.get(pk=pizza.pk)
        self.assertEqual(updated_pizza.name, 'Four Cheese')
        self.assertEqual(list(updated_pizza.toppings.all()), [self.cheese, new_topping])

    def test_delete_pizza(self):
        # Create
        pizza = Pizza.objects.create(name='Pepperoni Pizza')
        pizza.toppings.set([self.cheese, self.tomato])
        # Delete
        pizza.delete()
        # Confirm Deletion
        with self.assertRaises(Pizza.DoesNotExist):
            Pizza.objects.get(pk=pizza.pk)

    def test_duplicate_pizza(self):
        # Create
        Pizza.objects.create(name='Hawaiian')
        # Attempt to Create Duplicate
        with self.assertRaises(IntegrityError):
            Pizza.objects.create(name='Hawaiian')
