import React from 'react';
import { Container, Typography } from '@material-ui/core';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Pizza Management System
      </Typography>
      <Typography variant="body1">
        Use the navigation links to manage toppings and pizzas.
      </Typography>
    </Container>
  );
};

export default HomePage;
