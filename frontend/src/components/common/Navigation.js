import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Pizza Management System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/Toppings">
          Toppings
        </Button>
        <Button color="inherit" component={Link} to="/pizzas">
          Pizzas
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
