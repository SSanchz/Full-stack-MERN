// FILE: seed.js
const mongoose = require('mongoose');
const Book = require('./models/Book');

const books = [
  {
    id: "1",
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    description: "Harry Potter is in his second year at Hogwarts School of Witchcraft and Wizardry...",
    image: "/images/chamber.png",
    status: "Available",
    backgroundColor: "#70051c",
  },
  {
    id: "2",
    title: "Catching Fire",
    author: "Suzanne Collins",
    description: "Katniss and Peeta become symbols of rebellion in a dystopian future.",
    image: "/images/CatchingFire.png",
    status: "Checked Out",
    backgroundColor: "#660d06",
  },
  {
    id: "3",
    title: "The Ballad of Songbirds and Snakes",
    author: "Suzanne Collins",
    description: "A young Coriolanus Snow mentors a District 12 tribute in the Hunger Games.",
    image: "/images/TheBalladofSongbirds.png",
    status: "Available",
    backgroundColor: "#0d160f",
  },
  {
    id: "4",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    description: "A young boy with a great destiny proves his worth at Hogwarts School...",
    image: "/images/SorcerersStone.png",
    status: "Available",
    backgroundColor: "#571909",
  },
  {
    id: "5",
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
    description: "Harry competes in the dangerous Triwizard Tournament.",
    image: "/images/goblet.png",
    status: "Checked Out",
    backgroundColor: "#131646",
  },
  {
    id: "6",
    title: "Mockingjay",
    author: "Suzanne Collins",
    description: "The final battle for freedom in Panem reaches a thrilling conclusion.",
    image: "/images/Mockingjay.png",
    status: "Available",
    backgroundColor: "#0091d4",
  },
  {
    id: "7",
    title: "Harry Potter and the Deathly Hallows",
    author: "J.K. Rowling",
    description: "The final battle between Harry and Voldemort for the fate of the wizarding world.",
    image: "/images/DeathlyHallows.png",
    status: "Checked Out",
    backgroundColor: "#bb7b05",
  },
  {
    id: "8",
    title: "The Hunger Games",
    author: "Suzanne Collins",
    description: "A gripping tale of survival and rebellion in a dystopian society.",
    image: "/images/HungerG.png",
    status: "Checked Out",
    backgroundColor: "#1a1a1a",
  },
  {
    id: "9",
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling",
    description: "Harry learns about Sirius Black and faces the Dementors of Azkaban.",
    image: "/images/PrisonerOfAzkaban.png",
    status: "Available",
    backgroundColor: "#8b1c00",
  },
  {
    id: "10",
    title: "Harry Potter and the Half-Blood Prince",
    author: "J.K. Rowling",
    description: "Harry uncovers Voldemort's past and the power of Horcruxes.",
    image: "/images/half-blood.png",
    status: "Available",
    backgroundColor: "#16331f",
  },
  {
    id: "11",
    title: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling",
    description: "The Order of the Phoenix rises to battle the dark forces of Voldemort.",
    image: "/images/Phoenix.png",
    status: "Available",
    backgroundColor: "#00478a",
  },
];

mongoose.connect('mongodb+srv://dbUser:dbPass@cluster0.fx7yg.mongodb.net/library', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    return Book.insertMany(books);
  })
  .then(() => {
    console.log('Books seeded');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding books:', err);
  });
  