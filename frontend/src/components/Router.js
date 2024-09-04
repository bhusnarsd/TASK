import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/LoginPage';
import Signup from '../pages/SignUp';
import AddBook from '../pages/AddBook';
import EditBook from '../pages/EditBook';
import BookDetails from '../pages/BookDetails';
import BookList from './BookList';

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/home" element={<Home />} />
    <Route path="/books" element={<BookList />} />
    <Route path="/add" element={<AddBook />} />
    <Route path="/edit/:id" element={<EditBook />} />
    <Route path="/book/:id" element={<BookDetails />} />
  </Routes>
);

export default RoutesComponent;
