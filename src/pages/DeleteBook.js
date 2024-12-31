import React, { useState } from 'react';
import axios from 'axios';
import './DeleteBook.css'; // Import the CSS for styling

function DeleteBook() {
  const [ISBN, setISBN] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async () => {
    try {
      setError('');
      setSuccessMessage('');
      await axios.delete(`http://localhost:3001/delete-book/${ISBN}`);
      setSuccessMessage('Book deleted successfully');
    } catch (error) {
      setError('Error deleting book');
      console.error('Error:', error);
    }
  };

  return (
    <div className="delete-book-container">
      <h2>Delete Book by ISBN</h2>
      <div className="delete-book-form">
        <input
          type="text"
          placeholder="Enter ISBN"
          value={ISBN}
          onChange={(e) => setISBN(e.target.value)}
          className="input-field"
          required
        />
        <button onClick={handleDelete} className="delete-button">Delete Book</button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default DeleteBook;
