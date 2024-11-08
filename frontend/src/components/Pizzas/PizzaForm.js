import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { getToppings, addPizza, updatePizza } from '../../services/api';

const PizzaForm = ({ open, onClose, onSuccess, pizzaToEdit }) => {
  const [name, setName] = useState(''); // State to store pizza name
  const [selectedToppings, setSelectedToppings] = useState([]); // State to store selected toppings
  const [toppings, setToppings] = useState([]); // State to store all available toppings
  const [error, setError] = useState(''); // State to store error message

  // Fetch all available toppings
  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const data = await getToppings();
        setToppings(data);
      } catch (error) {
        console.error('Error fetching toppings:', error);
      }
    };
    fetchToppings();
  }, []);

  // Set initial form values based on whether we're editing or adding a pizza
  useEffect(() => {
    if (pizzaToEdit) {
      setName(pizzaToEdit.name);
      setSelectedToppings(pizzaToEdit.toppings.map((t) => t.id));
    } else {
      setName('');
      setSelectedToppings([]);
    }
    setError('');
  }, [pizzaToEdit]);

  // Handle form submission (add or update pizza)
  const handleSubmit = async () => {
    try {
        const pizzaData = {
            name,  // The name of the pizza
            topping_ids: selectedToppings  // IDs of the selected toppings
        };
        if (pizzaToEdit) {
            await updatePizza(pizzaToEdit.id, pizzaData);
        } else {
            await addPizza(pizzaData);
        }
        onSuccess(); // Callback to indicate success
        onClose(); // Close the form dialog
    } catch (err) {
        setError(err.response?.data || 'An error occurred.');
        console.error('Error submitting pizza:', err.response?.data);
    }
  };

  // Handle changes in topping selection
  const handleToppingsChange = (event) => {
    setSelectedToppings(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{pizzaToEdit ? 'Edit Pizza' : 'Add New Pizza'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Pizza Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Toppings</InputLabel>
          <Select
            multiple
            value={selectedToppings}
            onChange={handleToppingsChange}
            renderValue={(selected) =>
              toppings
                .filter((t) => selected.includes(t.id))
                .map((t) => t.name)
                .join(', ')
            }
          >
            {toppings.map((topping) => (
              <MenuItem key={topping.id} value={topping.id}>
                <Checkbox
                  checked={selectedToppings.includes(topping.id)}
                />
                <ListItemText primary={topping.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {pizzaToEdit ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PizzaForm;
