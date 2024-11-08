import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getPizzas, deletePizza } from '../../services/api';

const PizzasList = ({ onEdit }) => {
  const [pizzas, setPizzas] = useState([]); // State to store pizzas

  // Fetch pizzas from the API
  const fetchPizzas = async () => {
    try {
      const data = await getPizzas();
      setPizzas(data);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
  };
 
  // Fetch pizzas on component mount
  useEffect(() => {
    fetchPizzas();
  }, []);

  // Handle delete operation for a pizza
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pizza?')) {
      try {
        await deletePizza(id);
        fetchPizzas(); // Refresh the pizzas list after deletion
      } catch (error) {
        console.error('Error deleting pizza:', error);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pizza Name</TableCell>
            <TableCell>Toppings</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pizzas.map((pizza) => (
            <TableRow key={pizza.id}>
              <TableCell>{pizza.name}</TableCell>
              <TableCell>
                {pizza.toppings.map((topping) => topping.name).join(', ')}
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit(pizza)}> {/* Trigger delete action */}
                  <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(pizza.id)} // Trigger delete action
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PizzasList;
