import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import BookForm from '../../src/components/BookForm';
import '../App.css';

const AddBook = () => {
  const [book, setBook] = useState({ title: '', author: '', year: '', genre: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!book.title) newErrors.title = 'Title is required';
    if (!book.author) newErrors.author = 'Author is required';
    if (!book.year) {
      newErrors.year = 'Year is required';
    } else if (isNaN(book.year) || book.year < 1000 || book.year > new Date().getFullYear()) {
      newErrors.year = 'Year must be a valid number between 1000 and the current year';
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:3005/v1/books',
        book,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate('/home');
      }
    } catch (error) {
      console.error('There was an error adding the book!', error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div className="add-book">
      <h2>Add a New Book</h2>
      <BookForm 
        book={book} 
        setBook={setBook} 
        handleSubmit={handleSubmit} 
        errors={errors} 
      />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default AddBook;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import BookForm from '../../src/components/BookForm';
// import './AddBook.css'; // Updated CSS file

// const AddBook = () => {
//   const [book, setBook] = useState({ title: '', author: '', year: '', genre: '' });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   // Validation function
//   const validateForm = () => {
//     const newErrors = {};
//     if (!book.title) newErrors.title = 'Title is required';
//     if (!book.author) newErrors.author = 'Author is required';
//     if (!book.year) {
//       newErrors.year = 'Year is required';
//     } else if (isNaN(book.year) || book.year < 1000 || book.year > new Date().getFullYear()) {
//       newErrors.year = 'Year must be a valid number between 1000 and the current year';
//     }
//     return newErrors;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await axios.post(
//         'http://localhost:3005/v1/books',
//         book,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         navigate('/home');
//       }
//     } catch (error) {
//       console.error('There was an error adding the book!', error);
//       // Handle error, e.g., display an error message
//     }
//   };

//   return (
//     <div className="add-book">
//       <h2>Add a New Book</h2>
//       <BookForm 
//         book={book} 
//         setBook={setBook} 
//         handleSubmit={handleSubmit} 
//         errors={errors} 
//       />
//       <Link to="/" className="btn-back">Back to Home</Link>
//     </div>
//   );
// };

// export default AddBook;
