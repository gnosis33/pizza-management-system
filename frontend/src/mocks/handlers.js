// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

// Mock data for toppings
let toppings = [
  { id: 1, name: 'Cheese' },
  { id: 2, name: 'Pepperoni' },
  // Add more mock toppings as needed
];

// Mock data for pizzas
let pizzas = [
  { id: 1, name: 'Margherita', toppings: [1, 2] }, // Ensure toppings is always an array
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
    try {
      const { name } = await request.json();

      // Validate that 'name' is provided
      if (!name) {
        return HttpResponse.json(
          { error: 'Topping name is required.' },
          { status: 400 }
        );
      }

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
    } catch (error) {
      return HttpResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 }
      );
    }
  }),

  // Update a topping
  http.put('/api/toppings/:id/', async ({ request, params }) => {
    try {
      const { id } = params;
      const { name } = await request.json();

      // Validate that 'name' is provided
      if (!name) {
        return HttpResponse.json(
          { error: 'Topping name is required.' },
          { status: 400 }
        );
      }

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
          topping.id !== parseInt(id, 10)
      );

      if (exists) {
        return HttpResponse.json(
          { error: 'This topping already exists.' },
          { status: 400 }
        );
      }

      toppings[toppingIndex].name = name;
      return HttpResponse.json(toppings[toppingIndex], { status: 200 });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 }
      );
    }
  }),

  // Delete a topping
  http.delete('/api/toppings/:id/', ({ params }) => {
    const { id } = params;
    console.log('Attempting to delete topping with ID:', id); // Debug log

    const toppingIndex = toppings.findIndex((t) => t.id === parseInt(id, 10));

    if (toppingIndex === -1) {
      console.log('Topping not found with ID:', id); // Additional log
      return HttpResponse.json(
        { error: 'Topping not found.' },
        { status: 404 }
      );
    }

    // Remove the topping from the array
    toppings.splice(toppingIndex, 1);

    // Remove the topping ID from all pizzas
    pizzas = pizzas.map((pizza) => ({
      ...pizza,
      toppings: pizza.toppings.filter((tid) => tid !== parseInt(id, 10)),
    }));

    console.log('Deleted topping with ID:', id); // Debug log

    // Return an empty response with 204 status code (no body)
    return new HttpResponse(null, { status: 204 });
  }),

 // Pizza handlers

  // Get all pizzas
  http.get('/api/pizzas/', () => {
    try {
      const pizzasWithToppings = pizzas.map((pizza) => ({
        ...pizza,
        toppings: Array.isArray(pizza.toppings)
          ? toppings.filter((t) => pizza.toppings.includes(t.id))
          : [],
      }));
      return HttpResponse.json(pizzasWithToppings, { status: 200 });
    } catch (error) {
      console.error('Error in GET /api/pizzas/:', error);
      return HttpResponse.json(
        { error: 'Failed to retrieve pizzas.' },
        { status: 500 }
      );
    }
  }),

  // Add a new pizza
  http.post('/api/pizzas/', async ({ request }) => {
    try {
      const { name, topping_ids: toppingIds } = await request.json(); // Updated field

      // Validate that 'name' is provided
      if (!name) {
        return HttpResponse.json(
          { error: 'Pizza name is required.' },
          { status: 400 }
        );
      }

      // Validate that 'topping_ids' is an array
      if (!Array.isArray(toppingIds)) {
        return HttpResponse.json(
          { error: 'Topping IDs must be an array.' },
          { status: 400 }
        );
      }

      const exists = pizzas.some(
        (pizza) => pizza.name.toLowerCase() === name.toLowerCase()
      );

      if (exists) {
        return HttpResponse.json(
          { error: 'This pizza already exists.' },
          { status: 400 }
        );
      }

      // Validate that all topping IDs exist
      const invalidToppings = toppingIds.filter(
        (id) => !toppings.some((topping) => topping.id === id)
      );

      if (invalidToppings.length > 0) {
        return HttpResponse.json(
          { error: `Invalid topping IDs: ${invalidToppings.join(', ')}` },
          { status: 400 }
        );
      }

      const newPizza = {
        id: pizzas.length + 1,
        name,
        toppings: toppingIds, // Store topping IDs
      };
      pizzas.push(newPizza);
      return HttpResponse.json(newPizza, { status: 201 });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 }
      );
    }
  }),

  // Update a pizza
  http.put('/api/pizzas/:id/', async ({ request, params }) => {
    try {
      const { id } = params;
      const { name, topping_ids: toppingIds } = await request.json(); // Updated field

      // Validate that 'name' is provided
      if (!name) {
        return HttpResponse.json(
          { error: 'Pizza name is required.' },
          { status: 400 }
        );
      }

      // Validate that 'topping_ids' is an array
      if (!Array.isArray(toppingIds)) {
        return HttpResponse.json(
          { error: 'Topping IDs must be an array.' },
          { status: 400 }
        );
      }

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

      // Validate that all topping IDs exist
      const invalidToppings = toppingIds.filter(
        (tid) => !toppings.some((topping) => topping.id === tid)
      );

      if (invalidToppings.length > 0) {
        return HttpResponse.json(
          { error: `Invalid topping IDs: ${invalidToppings.join(', ')}` },
          { status: 400 }
        );
      }

      pizzas[pizzaIndex] = {
        id: parseInt(id),
        name,
        toppings: toppingIds, // Update topping IDs
      };

      return HttpResponse.json(pizzas[pizzaIndex], { status: 200 });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Invalid request payload.' },
        { status: 400 }
      );
    }
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
    return new HttpResponse(null, { status: 204 }); // No body
  }),
];