from rest_framework import serializers
from .models import Topping, Pizza

# Serializer for the Topping model
class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ['id', 'name']  # Fields to include in the serialized output

    def validate_name(self, value):
        # Check if a topping with the same name already exists (case insensitive)
        if Topping.objects.filter(name__iexact=value).exclude(pk=self.instance.pk if self.instance else None).exists():
            raise serializers.ValidationError("This topping already exists.")
        return value

# Serializer for the Pizza model
class PizzaSerializer(serializers.ModelSerializer):
    # Use ToppingSerializer for reading, PrimaryKeyRelatedField for writing
    toppings = ToppingSerializer(many=True, read_only=True)
    topping_ids = serializers.PrimaryKeyRelatedField(
        queryset=Topping.objects.all(),
        many=True,
        write_only=True,
        source='toppings'
    )

    class Meta:
        model = Pizza
        fields = ['id', 'name', 'toppings', 'topping_ids'] # Fields to include in the serialized output

    def validate(self, value):
        # Check if a pizza with the same name already exists (case insensitive)
        if Pizza.objects.filter(name__iexact=value['name']).exclude(pk=self.instance.pk if self.instance else None).exists():
            raise serializers.ValidationError({'name': 'This pizza already exists.'})
        return value
