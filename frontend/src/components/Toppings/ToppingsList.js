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
import { getToppings, deleteTopping } from '../../services/api';

const ToppingsList = ({ onEdit }) => {
  const [toppings, setToppings] = useState([]);

  const fetchToppings = async () => {
    try {
      const data = await getToppings();
      setToppings(data);
    } catch (error) {
      console.error('Error fetching toppings:', error);
    }
  };

  useEffect(() => {
    fetchToppings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this topping?')) {
      try {
        await deleteTopping(id);
        fetchToppings();
      } catch (error) {
        console.error('Error deleting topping:', error);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Topping Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {toppings.map((topping) => (
            <TableRow key={topping.id}>
              <TableCell>{topping.name}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  onClick={() => onEdit(topping)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(topping.id)}
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

export default ToppingsList;
