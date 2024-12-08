// FILE: App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import CheckOutPage from './CheckOutPage';

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [unavailableBooks, setUnavailableBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const allBooksResponse = await axios.get('http://localhost:5000/books');
      const availableBooksResponse = await axios.get('http://localhost:5000/books/available');
      const unavailableBooksResponse = await axios.get('http://localhost:5000/books/checked-out');
      setAllBooks(allBooksResponse.data);
      setAvailableBooks(availableBooksResponse.data);
      setUnavailableBooks(unavailableBooksResponse.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCheckIn = async (id) => {
    try {
      await axios.post(`http://localhost:5000/books/check-in/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error checking in book:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <header className="App-header">
              <h1>Library</h1>
              <Link to="/checkout">
                <button className="checkout-button">Check Out</button>
              </Link>
            </header>
            <div className="book-sections">
              <div className="book-section">
                <h2>All Books</h2>
                <ul className="book-list">
                  {allBooks.map((book) => (
                    <li key={book._id} className="book-item">
                      <div className="book-details">
                        <h2>{book.title}</h2>
                        <p>Author: {book.author}</p>
                        <p>Description: {book.description}</p>
                        <img src={book.image} alt={book.title} className="book-image" />
                        <p>Status: {book.status}</p>
                        {book.status === 'checked out' && <p>Checked out by: {book.checkedOutBy}</p>}
                      </div>
                      {book.status === 'checked out' && (
                        <button onClick={() => handleCheckIn(book._id)}>Check In</button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="book-section">
                <h2>Available Books</h2>
                <ul className="book-list">
                  {availableBooks.map((book) => (
                    <li key={book._id} className="book-item">
                      <div className="book-details">
                        <h2>{book.title}</h2>
                        <p>Author: {book.author}</p>
                        <p>Description: {book.description}</p>
                        <img src={book.image} alt={book.title} className="book-image" />
                        <p>Status: {book.status}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="book-section">
                <h2>Unavailable Books</h2>
                <ul className="book-list">
                  {unavailableBooks.map((book) => (
                    <li key={book._id} className="book-item">
                      <div className="book-details">
                        <h2>{book.title}</h2>
                        <p>Author: {book.author}</p>
                        <p>Description: {book.description}</p>
                        <img src={book.image} alt={book.title} className="book-image" />
                        <p>Status: {book.status}</p>
                        <p>Checked out by: {book.checkedOutBy}</p>
                      </div>
                      <button onClick={() => handleCheckIn(book._id)}>Check In</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        } />


        <Route path="/checkout/:bookId" element={<CheckOutPage />} />
        <Route path="/checkout" element={<CheckOutPage availableBooks={availableBooks} fetchBooks={fetchBooks} />} />
      </Routes>
    </Router>
  );
}

export default App;