import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/home">Home</Link>
      <Link to="/add">Add Book</Link>
    </nav>
  );
};

export default Navbar;
