import React, { useState } from 'react';
import './SearchBook.css'; // Import the CSS for styling

const SearchBook = () => {
  const [ISBN, setISBN] = useState('');
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/search-book/${ISBN}`);

      if (response.ok) {
        const bookData = await response.json();
        setBook(bookData);
        setError('');
      } else {
        setError('Book not found');
        setBook(null);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error searching for book');
    }
  };

  return (
    <div className="search-book-container">
      <h2>Search Book by ISBN</h2>
      <form onSubmit={handleSearch} className="search-book-form">
        <input
          type="text"
          placeholder="Enter ISBN to search"
          value={ISBN}
          onChange={(e) => setISBN(e.target.value)}
          required
          className="search-input"
        />
        <button type="submit" className="search-button">Search Book</button>
      </form>

      {book && (
        <div className="book-details">
          <h3>Book Details</h3>
          <table className="book-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Title</strong></td>
                <td>{book.BookTitle}</td>
              </tr>
              <tr>
                <td><strong>ISBN</strong></td>
                <td>{book.ISBN}</td>
              </tr>
              <tr>
                <td><strong>Author</strong></td>
                <td>{book.Author}</td>
              </tr>
              <tr>
                <td><strong>Category</strong></td>
                <td>{book.Category}</td>
              </tr>
              <tr>
                <td><strong>Quantity</strong></td>
                <td>{book.Quantity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SearchBook;
