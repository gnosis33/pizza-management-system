import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
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
        <Button color="inherit" component={Link} to="/toppings">
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
