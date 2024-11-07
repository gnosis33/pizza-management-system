import React, { useState } from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import PizzasList from '../components/Pizzas/PizzasList';
import PizzaForm from '../components/Pizzas/PizzaForm';

const PizzasPage = () => {
  const [open, setOpen] = useState(false);
  const [pizzaToEdit, setPizzaToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleAddClick = () => {
    setPizzaToEdit(null);
    setOpen(true);
  };

  const handleEdit = (pizza) => {
    setPizzaToEdit(pizza);
    setOpen(true);
  };

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Pizzas
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginBottom: '20px' }}
      >
        Add New Pizza
      </Button>
      <PizzasList onEdit={handleEdit} key={refresh} />
      <PizzaForm
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
        pizzaToEdit={pizzaToEdit}
      />
    </Container>
  );
};

export default PizzasPage;
