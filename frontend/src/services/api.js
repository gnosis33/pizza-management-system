// frontend/src/services/api.js
import axios from 'axios';

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    if (process.env.REACT_APP_USE_MOCK === 'true') {
      console.log('Using mock backend:', process.env.REACT_APP_MOCK_BACKEND_URL);
      return `/api`; // Mock backend URL (intercepted by msw)
    } else if (process.env.REACT_APP_USE_LOCAL_BACKEND === 'true') {
      console.log('Using local backend:', process.env.REACT_APP_LOCAL_BACKEND_URL);
      return `${process.env.REACT_APP_LOCAL_BACKEND_URL}/api`; // Real Django backend URL for development in local network
    } else {
      console.log('Using remote backend:', process.env.REACT_APP_BACKEND_URL);
      return `${process.env.REACT_APP_BACKEND_URL}/api`; // Default backend URL
    }
  } else {
    // Production mode
    return `${process.env.REACT_APP_BACKEND_URL}/api`; // Backend URL from environment variable
  }
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
});

// Toppings API
export const getToppings = async () => {
  const response = await apiClient.get('/toppings/'); // GET request to fetch all toppings
  return response.data;
};

export const addTopping = async (topping) => {
  const response = await apiClient.post('/toppings/', topping); // POST request to add a new topping
  return response.data;
};

export const updateTopping = async (id, topping) => {
  const response = await apiClient.put(`/toppings/${id}/`, topping); // PUT request to update an existing topping
  return response.data;
};

export const deleteTopping = async (id) => {
  await apiClient.delete(`/toppings/${id}/`); // DELETE request to remove a topping by ID
};

// Pizzas API
export const getPizzas = async () => {
  const response = await apiClient.get('/pizzas/'); // GET request to fetch all pizzas
  return response.data;
};

export const addPizza = async (pizza) => {
  const response = await apiClient.post('/pizzas/', pizza); // POST request to add a new pizza
  return response.data;
};

export const updatePizza = async (id, pizza) => {
  const response = await apiClient.put(`/pizzas/${id}/`, pizza); // PUT request to update an existing pizza
  return response.data;
};

export const deletePizza = async (id) => {
  await apiClient.delete(`/pizzas/${id}/`); // DELETE request to remove a pizza by ID
};
