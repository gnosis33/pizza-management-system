from django.db import models

# Toppings model for the pizza toppings
class Topping(models.Model):
    name = models.CharField(max_length=100, unique=True) # Name of the topping, must be unique

    def __str__(self):
        return self.name # String representation of the topping

# Pizza model for the pizza name and toppings on a pizza
class Pizza(models.Model):
    name = models.CharField(max_length=100, unique=True) # Name of the pizza, must be unique
    toppings = models.ManyToManyField(Topping, related_name='pizzas') # Many-to-Many relationship with toppings

    def __str__(self):
        return self.name # String representation of the pizza