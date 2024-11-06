from rest_framework import serializers
from .models import Topping, Pizza

class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = '__all__'

    def validate_name(self, value):
        if Topping.objects.filter(name__iexact=value).exists():
            raise serializers.ValidationError("This topping already exists.")
        return value

class PizzaSerializer(serializers.ModelSerializer):
    toppings = serializers.PrimaryKeyRelatedField(
        queryset=Topping.objects.all(),
        many=True
    )

    class Meta:
        model = Pizza
        fields = '__all__'

    def validate_name(self, value):
        if Pizza.objects.filter(name__iexact=value).exists():
            raise serializers.ValidationError("This pizza already exists.")
        return value
