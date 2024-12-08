// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

mongoose.connect('mongodb+srv://dbUser:dbPass@cluster0.fx7yg.mongodb.net/library', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publisher: String,
  isbn: String,
  status: { type: String, default: 'Available' },
  checkedOutBy: String,
  dueDate: Date,
});

const Book = mongoose.model('Book', bookSchema);




app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Server error');
  }
});

app.get('/books/available', async (req, res) => {
  try {
    const books = await Book.find({ status: 'Available' });
    res.json(books);
  } catch (error) {
    console.error('Error fetching available books:', error);
    res.status(500).send('Server error');
  }
});

app.get('/books/checked-out', async (req, res) => {
  try {
    const books = await Book.find({ status: 'Checked Out' });
    res.json(books);
  } catch (error) {
    console.error('Error fetching checked-out books:', error);
    res.status(500).send('Server error');
  }
});

app.post('/books/check-out/:id', async (req, res) => {
  const { id } = req.params;
  const { checkedOutBy } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(id, { status: 'Checked Out', checkedOutBy }, { new: true });
    res.json(book);
  } catch (error) {
    console.error('Error checking out book:', error);
    res.status(500).send('Server error');
  }
});

app.post('/books/check-in/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(id, { status: 'Available', checkedOutBy: null, dueDate: null }, { new: true });
    res.json(book);
  } catch (error) {
    console.error('Error checking in book:', error);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));