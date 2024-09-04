import React from 'react';
import '../App.css'; 

const BookForm = ({ book, setBook, handleSubmit }) => {
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={book.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" name="author" value={book.author} onChange={handleChange} required />
      </div>
      <div>
        <label>Year:</label>
        <input type="text" name="year" value={book.year} onChange={handleChange} required />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" name="genre" value={book.genre} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;
