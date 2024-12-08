   // FILE: db.js
   const { MongoClient } = require('mongodb');

   const uri = "mongodb+srv://dbUser:dbPass@cluster0.fx7yg.mongodb.net/";
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

   async function fetchBooks() {
     try {
       await client.connect();
       const database = client.db('library');
       const collection = database.collection('books');
       const books = await collection.find({}).toArray();
       return books;
     } finally {
       await client.close();
     }
   }

   module.exports = { fetchBooks };