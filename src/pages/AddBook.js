import React, { useState } from 'react';
import './AddBook.css';  // Import the CSS for styling

const AddBook = ({ refreshBooks }) => {
  const [BookTitle, setBookTitle] = useState('');
  const [ISBN, setISBN] = useState('');
  const [Author, setAuthor] = useState('');
  const [Category, setCategory] = useState('');
  const [Quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      BookTitle,
      ISBN,
      Author,
      Category,
      Quantity,
    };

    try {
      // Send the data to the backend
      await fetch('http://localhost:3001/add-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      // Reset form fields
      setBookTitle('');
      setISBN('');
      setAuthor('');
      setCategory('');
      setQuantity('');

      // Trigger a re-fetch of the books list
      refreshBooks();
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="input-group">
          <label htmlFor="bookTitle">Book Title</label>
          <input
            id="bookTitle"
            type="text"
            placeholder="Enter Book Title"
            value={BookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            id="isbn"
            type="text"
            placeholder="Enter ISBN"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            placeholder="Enter Author's Name"
            value={Author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            placeholder="Enter Category"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            placeholder="Enter Quantity"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
