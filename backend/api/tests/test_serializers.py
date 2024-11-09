from django.test import TestCase
from api.models import Topping, Pizza
from api.serializers import ToppingSerializer, PizzaSerializer

class ToppingSerializerTest(TestCase):

    def setUp(self):
        self.topping_data = {'name': 'Cheese'}

    def test_valid_topping_serializer(self):
        serializer = ToppingSerializer(data=self.topping_data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data, self.topping_data)

    def test_invalid_topping_serializer_duplicate(self):
        Topping.objects.create(name='Cheese')
        serializer = ToppingSerializer(data=self.topping_data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors['name'][0], 'topping with this name already exists.')

class PizzaSerializerTest(TestCase):

    def setUp(self):
        self.cheese = Topping.objects.create(name='Cheese')
        self.tomato = Topping.objects.create(name='Tomato')
        self.pizza_data = {
            'name': 'Margherita',
            'topping_ids': [self.cheese.id, self.tomato.id]
        }

    def test_valid_pizza_serializer(self):
        serializer = PizzaSerializer(data=self.pizza_data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['name'], 'Margherita')
        self.assertEqual([t.id for t in serializer.validated_data['toppings']], [self.cheese.id, self.tomato.id])

    def test_invalid_pizza_serializer_duplicate(self):
        Pizza.objects.create(name='Margherita')
        serializer = PizzaSerializer(data=self.pizza_data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors['name'][0], 'pizza with this name already exists.')
