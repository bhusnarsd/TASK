import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 

const BookList = ({ books }) => {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`http://localhost:3005/v1/books/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        window.location.reload();
      } catch (error) {
        console.error("There was an error deleting the book!", error);
      }
    }
  };
  

  return (
    <div className="d-flex flex-wrap justify-content-start">
      {books.map((book) => (
        <div className="card m-2" style={{ width: '15rem' }} key={book.id}>
          <div className="card-body">
            <h2 className="card-title text-center">{book.title}</h2>
            <hr></hr>
            <p className="card-text">
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Year:</strong> {book.year}
            </p>
            <p>
              <strong>Genre:</strong> {book.genre}
            </p>
            <div className="d-flex justify-content-between">
              <Link to={`/edit/${book.id}`} className="btn btn-outline-primary">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(book.id)} style={{width:'85px'}}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
            <div className="text-center mt-3">
              <Link to={`/book/${book.id}`} className="btn btn-primary">
                <i className="bi bi-eye"></i> View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
