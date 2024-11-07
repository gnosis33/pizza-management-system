// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'; // Import the http namespace and HttpResponse from msw

// Mock data for toppings
const toppings = [
  { id: 1, name: 'Cheese' },
  { id: 2, name: 'Pepperoni' },
  // Add more mock toppings as needed
];

// Mock data for pizzas
let pizzas = [
  { id: 1, name: 'Margherita', toppings: [1, 2] }, // Assuming topping IDs
  // Add more mock pizzas as needed
];

export const handlers = [
  // Toppings handlers

  // Get all toppings
  http.get('/api/toppings/', () => {
    return HttpResponse.json(toppings, { status: 200 });
  }),

  // Add a new topping
  http.post('/api/toppings/', async ({ request }) => {
    const { name } = await request.json();
    const exists = toppings.some(
      (topping) => topping.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      return HttpResponse.json(
        { error: 'This topping already exists.' },
        { status: 400 }
      );
    }

    const newTopping = { id: toppings.length + 1, name };
    toppings.push(newTopping);
    return HttpResponse.json(newTopping, { status: 201 });
  }),

  // Update a topping
  http.put('/api/toppings/:id/', async ({ request, params }) => {
    const { id } = params;
    const { name } = await request.json();
    const toppingIndex = toppings.findIndex((t) => t.id === parseInt(id));

    if (toppingIndex === -1) {
      return HttpResponse.json(
        { error: 'Topping not found.' },
        { status: 404 }
      );
    }

    const exists = toppings.some(
      (topping) =>
        topping.name.toLowerCase() === name.toLowerCase() &&
        topping.id !== parseInt(id)
    );

    if (exists) {
      return HttpResponse.json(
        { error: 'This topping already exists.' },
        { status: 400 }
      );
    }

    toppings[toppingIndex].name = name;
    return HttpResponse.json(toppings[toppingIndex], { status: 200 });
  }),

  // Delete a topping
  http.delete('/api/toppings/:id/', ({ params }) => {
    const { id } = params;
    const toppingIndex = toppings.findIndex((t) => t.id === parseInt(id));

    if (toppingIndex === -1) {
      return HttpResponse.json(
        { error: 'Topping not found.' },
        { status: 404 }
      );
    }

    toppings.splice(toppingIndex, 1);
    return HttpResponse.text('Topping deleted', { status: 204 });
  }),

  // Pizza handlers

  // Get all pizzas
  http.get('/api/pizzas/', () => {
    const pizzasWithToppings = pizzas.map((pizza) => ({
      ...pizza,
      toppings: toppings.filter((t) => pizza.toppings.includes(t.id)),
    }));
    return HttpResponse.json(pizzasWithToppings, { status: 200 });
  }),

  // Add a new pizza
  http.post('/api/pizzas/', async ({ request }) => {
    const { name, toppings: toppingIds } = await request.json();
    const exists = pizzas.some(
      (pizza) => pizza.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      return HttpResponse.json(
        { error: 'This pizza already exists.' },
        { status: 400 }
      );
    }

    const newPizza = {
      id: pizzas.length + 1,
      name,
      toppings: toppingIds,
    };
    pizzas.push(newPizza);
    return HttpResponse.json(newPizza, { status: 201 });
  }),

  // Update a pizza
  http.put('/api/pizzas/:id/', async ({ request, params }) => {
    const { id } = params;
    const { name, toppings: toppingIds } = await request.json();
    const pizzaIndex = pizzas.findIndex((p) => p.id === parseInt(id));

    if (pizzaIndex === -1) {
      return HttpResponse.json(
        { error: 'Pizza not found.' },
        { status: 404 }
      );
    }

    const exists = pizzas.some(
      (pizza) =>
        pizza.name.toLowerCase() === name.toLowerCase() &&
        pizza.id !== parseInt(id)
    );

    if (exists) {
      return HttpResponse.json(
        { error: 'This pizza already exists.' },
        { status: 400 }
      );
    }

    pizzas[pizzaIndex] = {
      id: parseInt(id),
      name,
      toppings: toppingIds,
    };

    return HttpResponse.json(pizzas[pizzaIndex], { status: 200 });
  }),

  // Delete a pizza
  http.delete('/api/pizzas/:id/', ({ params }) => {
    const { id } = params;
    const pizzaIndex = pizzas.findIndex((p) => p.id === parseInt(id));

    if (pizzaIndex === -1) {
      return HttpResponse.json(
        { error: 'Pizza not found.' },
        { status: 404 }
      );
    }

    pizzas.splice(pizzaIndex, 1);
    return HttpResponse.text('Pizza deleted', { status: 204 });
  }),
];
