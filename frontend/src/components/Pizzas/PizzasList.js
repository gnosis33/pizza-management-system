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
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { getPizzas } from '../../services/api';

const PizzasList = ({ onEdit }) => {
  const [pizzas, setPizzas] = useState([]);

  const fetchPizzas = async () => {
    try {
      const data = await getPizzas();
      setPizzas(data);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pizza?')) {
      try {
        await deletePizza(id);
        fetchPizzas();
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
                <IconButton color="primary" onClick={() => onEdit(pizza)}>
                  <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(pizza.id)}
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
