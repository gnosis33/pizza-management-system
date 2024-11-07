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
  const [name, setName] = useState('');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [error, setError] = useState('');

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

  const handleSubmit = async () => {
    try {
      const pizzaData = {
        name,
        toppings: selectedToppings,
      };
      if (pizzaToEdit) {
        await updatePizza(pizzaToEdit.id, pizzaData);
      } else {
        await addPizza(pizzaData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

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
