import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import BookList from '../components/BookList';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:3005/v1/books', {
          params: {
            page,
            limit: 4,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setBooks(response.data.results);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("There was an error fetching the books!", error);
      }
    };

    fetchBooks();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="home">
      <h1>Library Book Collection</h1>
      <BookList books={books} />
      <div className="pagination d-flex justify-content-center mt-4">
        <button
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)} className='btn btn-warning h-25 w-25 me-2'
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => handlePageChange(page + 1)} className='btn btn-warning ms-2 h-25 w-25'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import './Home.css'; // Create a separate CSS file for Home page styles

// const Home = () => {
//   return (
//     <div className="home">
//       <header className="home-header">
//         <h1>Welcome to the Book Store</h1>
//         <p>Your one-stop destination for finding and managing books.</p>
//       </header>
//       <section className="home-content">
//         <div className="feature">
//           <h2>Browse Books</h2>
//           <p>Explore a wide range of books available in our collection.</p>
//           <Link to="/books" className="btn-primary">Browse Now</Link>
//         </div>
//         <div className="feature">
//           <h2>Add a Book</h2>
//           <p>Have a book to add? Share it with us and help others discover it.</p>
//           <Link to="/add" className="btn-primary">Add Book</Link>
//         </div>
//         <div className="feature">
//           <h2>Manage Your Books</h2>
//           <p>Keep track of your books and manage your collection easily.</p>
//           <Link to="/manage" className="btn-primary">Manage Books</Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
