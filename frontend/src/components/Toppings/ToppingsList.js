// frontend\src\components\Toppings\ToppingsList.js
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
  const [toppings, setToppings] = useState([]); // State to store toppings

  // Fetch toppings from the API
  const fetchToppings = async () => {
    try {
      const data = await getToppings();
      setToppings(data);
    } catch (error) {
      console.error('Error fetching toppings:', error);
    }
  };

  // Fetch toppings on component mount
  useEffect(() => {
    fetchToppings();
  }, []);

  // Handle delete operation for a topping
  const handleDelete = async (id) => {
      try {
        await deleteTopping(id);
        fetchToppings(); // Refresh the toppings list after deletion
      } catch (error) {
        console.error('Error deleting topping:', error);
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
                  onClick={() => onEdit(topping)} // Trigger edit action
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(topping.id)} // Trigger delete action
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
