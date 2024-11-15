// frontend\src\components\Toppings\ToppingForm.js
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { addTopping, updateTopping } from '../../services/api';

const ToppingForm = ({ open, onClose, onSuccess, toppingToEdit }) => {
  const [name, setName] = useState(''); // State to store topping name
  const [error, setError] = useState(''); // State to store error message

  // Set initial form values based on whether we're editing or adding a topping
  useEffect(() => {
    if (toppingToEdit) {
      setName(toppingToEdit.name);
    } else {
      setName('');
    }
    setError('');
  }, [toppingToEdit]);

  // Handle form submission (add or update topping)
  const handleSubmit = async () => {
    try {
      if (toppingToEdit) {
        await updateTopping(toppingToEdit.id, { name });
      } else {
        await addTopping({ name });
      }
      onSuccess(); // Callback to indicate success
      onClose(); // Close the form dialog
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {toppingToEdit ? 'Edit Topping' : 'Add New Topping'}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Topping Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {toppingToEdit ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToppingForm;
