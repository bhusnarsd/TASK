import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../App.css'; 

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:3005/v1/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBook(response.data);
      } catch (error) {
        console.error("There was an error fetching the book details!", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <Link to="/home">Back to Home</Link>
    </div>
  );
};

export default BookDetails;
