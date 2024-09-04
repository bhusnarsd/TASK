import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import '../App.css'; 

const EditBook = () => {
  const [book, setBook] = useState({ title: '', author: '', year: '', genre: '' });
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem('accessToken'); 
        const response = await axios.get(`http://localhost:3005/v1/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        console.log(response)
        setBook(response.data); 
      } catch (error) {
        console.error("There was an error fetching the book!", error);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('accessToken'); 
      await axios.put(`http://localhost:3005/v1/books/${id}`, book, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      navigate('/home');
      // history.push('/'); 
    } catch (error) {
      console.error("There was an error updating the book!", error);
    }
  };

  return (
    <div className="edit-book">
      <h2>Edit Book</h2>
      <BookForm book={book} setBook={setBook} handleSubmit={handleSubmit} />
    </div>
  );
};

export default EditBook;
