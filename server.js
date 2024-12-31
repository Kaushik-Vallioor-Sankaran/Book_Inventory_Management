const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Books')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Create Book Schema
const bookSchema = new mongoose.Schema({
  BookTitle: String,
  ISBN: { type: String, unique: true },
  Author: String,
  Category: String,
  Quantity: Number
});

const Book = mongoose.model('Book', bookSchema);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Add Book
app.post('/add-book', async (req, res) => {
  const bookData = req.body;
  try {
    const book = new Book(bookData);
    await book.save();
    res.status(201).send("Book added successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error adding book");
  }
});

// Search Book by ISBN
app.get('/search-book/:ISBN', async (req, res) => {
  try {
    const book = await Book.findOne({ ISBN: req.params.ISBN });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(400).send("Error searching for book");
  }
});

// Delete Book by ISBN
app.delete('/delete-book/:ISBN', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ ISBN: req.params.ISBN });
    if (book) {
      res.status(200).send("Book deleted successfully");
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(400).send("Error deleting book");
  }
});

// Get all Books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).send("Error fetching books");
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
