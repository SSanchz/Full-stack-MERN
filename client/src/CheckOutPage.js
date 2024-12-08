// FILE: CheckOutPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CheckOutPage.css';

function CheckOutPage({ availableBooks, fetchBooks }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [checkedOutBy, setCheckedOutBy] = useState('');
  const navigate = useNavigate();

  const handleCheckOut = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/books/check-out/${selectedBook}`, { checkedOutBy });
      fetchBooks();
      navigate('/');
    } catch (error) {
      console.error('Error checking out book:', error);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Check Out a Book</h2>
      <form onSubmit={handleCheckOut}>
        <label>
          Select Book:
          <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
            <option value="">Select a book</option>
            {availableBooks.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Checked Out By:
          <input type="text" value={checkedOutBy} onChange={(e) => setCheckedOutBy(e.target.value)} required />
        </label>
        <button type="submit">Check Out</button>
      </form>
    </div>
  );
}

export default CheckOutPage;