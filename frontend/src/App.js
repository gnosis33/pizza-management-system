import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ToppingsPage from './pages/ToppingsPage';
import PizzasPage from './pages/PizzasPage';
import Navigation from './components/common/Navigation';

// The App component is the root component of the application. 
// It uses the BrowserRouter component from react-router-dom to enable routing in the application. 
// The Navigation component is rendered at the top of the page, providing links to the different pages of the application. 
// The Routes component is used to define the routes for the different pages. 
// The Route components define the paths and the components to render when those paths are matched.

function App() {
  return (
    <Router>
      <CssBaseline />
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/toppings" element={<ToppingsPage />} /> 
          <Route path="/pizzas" element={<PizzasPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;