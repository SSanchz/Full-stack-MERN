import React, { useEffect, useState, useRef } from 'react';
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import CheckOutPage from './CheckOutPage';

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [unavailableBooks, setUnavailableBooks] = useState([]);

  const allBooksRef = useRef(null);
  const availableBooksRef = useRef(null);
  const unavailableBooksRef = useRef(null);

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3, // Number of books visible at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Add placeholders to the unavailable books
  const minimumItems = 3; // Set the minimum number of items in the carousel
  const placeholdersNeeded =
    unavailableBooks.length < minimumItems ? minimumItems - unavailableBooks.length : 0;
  const placeholderCards = Array.from({ length: placeholdersNeeded }, (_, index) => (
    <div key={`placeholder-${index}`} className="book-item placeholder unavailable">
      <div className="book-details">
        <h2>N/A</h2>
        <p>This slot is reserved for future books.</p>
        <img src="/images/placeholder-image.png" alt="Placeholder" className="book-image" />
      </div>
    </div>
  ));

  const handleWheel = (e, ref) => {
    if (ref.current) {
      if (e.deltaY > 0) {
        ref.current.slickNext();
      } else {
        ref.current.slickPrev();
      }
    }
  };

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = 'auto';
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <header className="App-header">
                <h1>Library</h1>
                <Link to="/checkout">
                  <button className="checkout-button">Check Out</button>
                </Link>
              </header>
              <div className="book-sections">
                <div
                  className="book-section"
                  onWheel={(e) => handleWheel(e, allBooksRef)}
                  onMouseEnter={disableScroll}
                  onMouseLeave={enableScroll}
                >
                  <h2>All Books</h2>
                  <Slider {...sliderSettings} ref={allBooksRef}>
                    {allBooks.map((book) => (
                      <div key={book._id} className="book-item available">
                        <div className="book-details">
                          <h2>{book.title}</h2>
                          <p>Author: {book.author}</p>
                          <p>Description: {book.description}</p>
                          <img src={book.image} alt={book.title} className="book-image" />
                          <p>Status: {book.status}</p>
                          {book.status === 'checked out' && (
                            <p>Checked out by: {book.checkedOutBy}</p>
                          )}
                        </div>
                        {book.status === 'checked out' && (
                          <button className="check-in" onClick={() => handleCheckIn(book._id)}>Check In</button>
                        )}
                      </div>
                    ))}
                  </Slider>
                </div>
                <div
                  className="book-section"
                  onWheel={(e) => handleWheel(e, availableBooksRef)}
                  onMouseEnter={disableScroll}
                  onMouseLeave={enableScroll}
                >
                  <h2>Available Books</h2>
                  <Slider {...sliderSettings} ref={availableBooksRef}>
                    {availableBooks.map((book) => (
                      <div key={book._id} className="book-item available">
                        <div className="book-details">
                          <h2>{book.title}</h2>
                          <p>Author: {book.author}</p>
                          <p>Description: {book.description}</p>
                          <img src={book.image} alt={book.title} className="book-image" />
                          <p>Status: {book.status}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div
                  className="book-section"
                  onWheel={(e) => handleWheel(e, unavailableBooksRef)}
                  onMouseEnter={disableScroll}
                  onMouseLeave={enableScroll}
                >
                  <h2>Unavailable Books</h2>
                  <Slider {...sliderSettings} ref={unavailableBooksRef}>
                    {unavailableBooks.map((book) => (
                      <div key={book._id} className="book-item unavailable">
                        <div className="book-details">
                          <h2>{book.title}</h2>
                          <p>Author: {book.author}</p>
                          <p>Description: {book.description}</p>
                          <img src={book.image} alt={book.title} className="book-image" />
                          <p>Status: {book.status}</p>
                          <p>Checked out by: {book.checkedOutBy}</p>
                        </div>
                        <button className="check-in" onClick={() => handleCheckIn(book._id)}>Check In</button>
                      </div>
                    ))}
                    {placeholderCards}
                  </Slider>
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/checkout/:bookId"
          element={<CheckOutPage />}
        />
        <Route
          path="/checkout"
          element={<CheckOutPage availableBooks={availableBooks} fetchBooks={fetchBooks} />}
        />
      </Routes>
    </Router>
  );
}

export default App;