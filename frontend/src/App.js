// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../src/components/NavBar';
import RoutesComponent from './components/Router'; // Import the new Routes component

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <RoutesComponent /> {/* Use the Routes component */}
      </div>
    </Router>
  );
}

export default App;
