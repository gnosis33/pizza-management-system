// frontend/src/services/api.js
import axios from 'axios';

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    if (process.env.REACT_APP_USE_MOCK === 'true') {
      console.log('Using mock backend:', process.env.REACT_APP_MOCK_BACKEND_URL);
      return `/api`;
    } else if (process.env.REACT_APP_USE_LOCAL_BACKEND === 'true') {
      console.log('Using local backend:', process.env.REACT_APP_LOCAL_BACKEND_URL);
      return `${process.env.REACT_APP_LOCAL_BACKEND_URL}/api`;
    } else {
      console.log('Using remote backend:', process.env.REACT_APP_BACKEND_URL);
      return `${process.env.REACT_APP_BACKEND_URL}/api`;
    }
  } else {
    // Production mode
    return `${process.env.REACT_APP_BACKEND_URL}/api`;
  }
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
});

// Helper function to handle errors
const handleError = (error) => {
  if (error.response) {
    // Server responded with a status code other than 2xx
    const errorMessage = error.response.data.detail || "An error occurred";
    console.error("API Error:", errorMessage);
    throw new Error(errorMessage);
  } else if (error.request) {
    // No response received from server
    console.error("No response from server");
    throw new Error("Network error: No response from server");
  } else {
    // Error setting up the request
    console.error("Request error:", error.message);
    throw new Error("Request setup error");
  }
};

// Toppings API
export const getToppings = async () => {
  try {
    const response = await apiClient.get('/toppings/');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addTopping = async (topping) => {
  try {
    const response = await apiClient.post('/toppings/', topping);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateTopping = async (id, topping) => {
  try {
    const response = await apiClient.put(`/toppings/${id}/`, topping);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTopping = async (id) => {
  try {
    await apiClient.delete(`/toppings/${id}/`);
  } catch (error) {
    handleError(error);
  }
};

// Pizzas API
export const getPizzas = async () => {
  try {
    const response = await apiClient.get('/pizzas/');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addPizza = async (pizza) => {
  try {
    const response = await apiClient.post('/pizzas/', pizza);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updatePizza = async (id, pizza) => {
  try {
    const response = await apiClient.put(`/pizzas/${id}/`, pizza);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deletePizza = async (id) => {
  try {
    await apiClient.delete(`/pizzas/${id}/`);
  } catch (error) {
    handleError(error);
  }
};
