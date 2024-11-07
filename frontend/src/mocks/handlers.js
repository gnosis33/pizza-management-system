import { rest } from 'msw';


// Mock data for toppings

const toppings = [
  { id: 1, name: 'Cheese' },
  { id: 2, name: 'Pepperoni' },
  // Add more mock toppings as needed
];

export const handlers = [
  // Get all toppings
  rest.get('/api/toppings/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(toppings));
  }),

  // Add a new topping
  rest.post('/api/toppings/', (req, res, ctx) => {
    const { name } = req.body;
    const exists = toppings.some(
      (topping) => topping.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'This topping already exists.' })
      );
    }
    const newTopping = { id: toppings.length + 1, name };
    toppings.push(newTopping);
    return res(ctx.status(201), ctx.json(newTopping));
  }),

  // Update a topping
  rest.put('/api/toppings/:id/', (req, res, ctx) => {
    const { id } = req.params;
    const { name } = req.body;
    const toppingIndex = toppings.findIndex((t) => t.id === parseInt(id));
    if (toppingIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: 'Topping not found.' }));
    }
    const exists = toppings.some(
      (topping) =>
        topping.name.toLowerCase() === name.toLowerCase() &&
        topping.id !== parseInt(id)
    );
    if (exists) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'This topping already exists.' })
      );
    }
    toppings[toppingIndex].name = name;
    return res(ctx.status(200), ctx.json(toppings[toppingIndex]));
  }),

  // Delete a topping
  rest.delete('/api/toppings/:id/', (req, res, ctx) => {
    const { id } = req.params;
    const toppingIndex = toppings.findIndex((t) => t.id === parseInt(id));
    if (toppingIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: 'Topping not found.' }));
    }
    toppings.splice(toppingIndex, 1);
    return res(ctx.status(204));
  }),
];


// Mock data for pizzas

let pizzas = [
    { id: 1, name: 'Margherita', toppings: [1, 2] }, // Assuming topping IDs
    // Add more mock pizzas as needed
  ];
  
  // Get all pizzas
  rest.get('/api/pizzas/', (req, res, ctx) => {
    const pizzasWithToppings = pizzas.map((pizza) => ({
      ...pizza,
      toppings: toppings.filter((t) => pizza.toppings.includes(t.id)),
    }));
    return res(ctx.status(200), ctx.json(pizzasWithToppings));
  }),
  
  // Add a new pizza
  rest.post('/api/pizzas/', (req, res, ctx) => {
    const { name, toppings: toppingIds } = req.body;
    const exists = pizzas.some(
      (pizza) => pizza.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'This pizza already exists.' })
      );
    }
    const newPizza = {
      id: pizzas.length + 1,
      name,
      toppings: toppingIds,
    };
    pizzas.push(newPizza);
    return res(ctx.status(201), ctx.json(newPizza));
  }),
  
  // Update a pizza
  rest.put('/api/pizzas/:id/', (req, res, ctx) => {
    const { id } = req.params;
    const { name, toppings: toppingIds } = req.body;
    const pizzaIndex = pizzas.findIndex((p) => p.id === parseInt(id));
    if (pizzaIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: 'Pizza not found.' }));
    }
    const exists = pizzas.some(
      (pizza) =>
        pizza.name.toLowerCase() === name.toLowerCase() &&
        pizza.id !== parseInt(id)
    );
    if (exists) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'This pizza already exists.' })
      );
    }
    pizzas[pizzaIndex] = {
      id: parseInt(id),
      name,
      toppings: toppingIds,
    };
    return res(ctx.status(200), ctx.json(pizzas[pizzaIndex]));
  }),
  
  // Delete a pizza
  rest.delete('/api/pizzas/:id/', (req, res, ctx) => {
    const { id } = req.params;
    const pizzaIndex = pizzas.findIndex((p) => p.id === parseInt(id));
    if (pizzaIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: 'Pizza not found.' }));
    }
    pizzas.splice(pizzaIndex, 1);
    return res(ctx.status(204));
  }),
  