import axios from 'axios';

const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
      return process.env.REACT_APP_USE_LOCAL_BACKEND === 'true'
        ? '/api' // MSW intercepts this
        : process.env.REACT_APP_LOCAL_BACKEND_URL; // Backend URL from environment variable
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
  