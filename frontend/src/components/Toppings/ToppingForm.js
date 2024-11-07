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
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (toppingToEdit) {
      setName(toppingToEdit.name);
    } else {
      setName('');
    }
    setError('');
  }, [toppingToEdit]);

  const handleSubmit = async () => {
    try {
      if (toppingToEdit) {
        await updateTopping(toppingToEdit.id, { name });
      } else {
        await addTopping({ name });
      }
      onSuccess();
      onClose();
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
