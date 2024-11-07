from rest_framework import serializers
from .models import Topping, Pizza

class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ['id', 'name']

    def validate_name(self, value):
        if Topping.objects.filter(name__iexact=value).exclude(pk=self.instance.pk if self.instance else None).exists():
            raise serializers.ValidationError("This topping already exists.")
        return value

class PizzaSerializer(serializers.ModelSerializer):
    toppings = serializers.PrimaryKeyRelatedField(
        queryset=Topping.objects.all(),
        many=True
    )

    class Meta:
        model = Pizza
        fields = ['id', 'name', 'toppings']

    def validate(self, value):
        if Pizza.objects.filter(name__iexact=value['name']).exclude(pk=self.instance.pk if self.instance else None).exists():
            raise serializers.ValidationError({'name': 'This pizza already exists.'})
        return value
