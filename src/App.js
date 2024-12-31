import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddBook from './pages/AddBook';
import SearchBook from './pages/SearchBook';
import DeleteBook from './pages/DeleteBook';
import ViewBooks from './pages/ViewBooks';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  // Trigger a re-fetch of books by toggling the refresh state
  const refreshBooks = () => setRefresh(!refresh);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Book Inventory Management</h1>
        </header>
        <nav className="app-nav">
          <ul className="nav-list">
            <li><Link to="/add" className="nav-link">Add Book</Link></li>
            <li><Link to="/search" className="nav-link">Search Book by ISBN</Link></li>
            <li><Link to="/delete" className="nav-link">Delete Book</Link></li>
            <li><Link to="/view" className="nav-link">Display All Books</Link></li>
          </ul>
        </nav>

        <div className="app-content">
          <Routes>
            <Route path="/add" element={<AddBook refreshBooks={refreshBooks} />} />
            <Route path="/search" element={<SearchBook />} />
            <Route path="/delete" element={<DeleteBook refreshBooks={refreshBooks} />} />
            <Route path="/view" element={<ViewBooks />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
