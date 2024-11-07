import axios from 'axios';

// Determine the base URL based on the environment
const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? '/api' // Development mode (MSW intercepts this)
      : '${process.env.REACT_APP_BACKEND_URL}/api', // Production mode (actual backend URL) https://your-backend-url/api
});

// Export your API functions using apiClient
export const getToppings = async () => {
  const response = await apiClient.get('/toppings/');
  return response.data;
};

// Toppings API
export const getToppings = async () => {
  const response = await apiClient.get('/toppings/');
  return response.data;
};

export const addTopping = async (topping) => {
  const response = await apiClient.post('/toppings/', topping);
  return response.data;
};

export const updateTopping = async (id, topping) => {
  const response = await apiClient.put(`/toppings/${id}/`, topping);
  return response.data;
};

export const deleteTopping = async (id) => {
  await apiClient.delete(`/toppings/${id}/`);
};


// Pizzas API
export const getPizzas = async () => {
    const response = await apiClient.get('/pizzas/');
    return response.data;
  };
  
  export const addPizza = async (pizza) => {
    const response = await apiClient.post('/pizzas/', pizza);
    return response.data;
  };
  
  export const updatePizza = async (id, pizza) => {
    const response = await apiClient.put(`/pizzas/${id}/`, pizza);
    return response.data;
  };
  
  export const deletePizza = async (id) => {
    await apiClient.delete(`/pizzas/${id}/`);
  };
  