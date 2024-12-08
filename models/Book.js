// FILE: models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String,
  status: { type: String, default: 'Available' },
  backgroundColor: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;