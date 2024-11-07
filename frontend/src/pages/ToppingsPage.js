import React, { useState } from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import ToppingsList from '../components/Toppings/ToppingsList';
import ToppingForm from '../components/Toppings/ToppingForm';

const ToppingsPage = () => {
  const [open, setOpen] = useState(false);
  const [toppingToEdit, setToppingToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleAddClick = () => {
    setToppingToEdit(null);
    setOpen(true);
  };

  const handleEdit = (topping) => {
    setToppingToEdit(topping);
    setOpen(true);
  };

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Toppings
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginBottom: '20px' }}
      >
        Add New Topping
      </Button>
      <ToppingsList onEdit={handleEdit} key={refresh} />
      <ToppingForm
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
        toppingToEdit={toppingToEdit}
      />
    </Container>
  );
};

export default ToppingsPage;
