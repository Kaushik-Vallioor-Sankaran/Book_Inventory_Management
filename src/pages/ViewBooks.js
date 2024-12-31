import React, { useEffect, useState } from 'react';
import './ViewBooks.css';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);

  // Function to fetch the list of books
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3001/books');
      const data = await response.json();
      setBooks(data); // Update the state with the fetched books
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="book-container">
      <h2>All Books</h2>
      <table className="book-table">
        <thead>
          <tr>
            <th>Book Title</th>
            <th>ISBN</th>
            <th>Author</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.BookTitle}</td>
              <td>{book.ISBN}</td>
              <td>{book.Author}</td>
              <td>{book.Category}</td>
              <td>{book.Quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBooks;
