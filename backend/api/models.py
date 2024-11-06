from django.db import models

# Toppings model for the pizza toppings
class Topping(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

# Pizza model for the pizza name and toppings on a pizza
class Pizza(models.Model):
    name = models.CharField(max_length=100, unique=True)
    toppings = models.ManyToManyField(Topping, related_name='pizzas')

    def __str__(self):
        return self.name