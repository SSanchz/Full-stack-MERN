# Library Book Tracker

This is a full-stack MERN application to track library books. The application allows users to view available and checked-out books, and provides functionality to check out and check in books.

## Features

- List all books
- List available books
- List checked-out books
- Check out a book
- Check in a book

## Technologies Used

- MongoDB
- Express
- React
- Node.js

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SSanchz/Full-stack-MERN.git
cd Full-stack-MERN

Server dependencies:
```bash
    npm install
    npm install concurrently --save-dev
    npm install -g concurrently

Client Dependencies:
```bash
    cd client
    npm install
    

Connect to a new the Mongodb using its string
    mongodb+srv://<db_user>:<db_password>@cluster0.fx7yg.mongodb.net/
    
    Populate the database with:
    ```bash
        node seed.js

OR

Connect to the default one (do not seed of it will create duplicates)
    mongodb+srv://dbUser:dbPass@cluster0.fx7yg.mongodb.net/

### Initialization
1) Start Server & Client:
```bash npm start


