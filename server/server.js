require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL client for Node.js

// Initialize Express app
const app = express();

// Use CORS and Express JSON middleware
app.use(cors());
app.use(express.json()); // This lets us send JSON to the server

// Create a new pool using the connection string from the .env file
const pool = new Pool({
  connectionString: 'postgres://postgres:Mh@129901@localhost:5432/master',
  password: 'Mh@129901', // Make sure it's enclosed in quotes,
  user: 'postgres'

  // If you're using SSL, you'll need to add the following (Heroku requires this, for example)
  // ssl: {
  //   rejectUnauthorized: false
  // }
});

// Basic route for testing if the server is running
app.get('/', (req, res) => {
  res.send('Hello, your server is up and running!');
});

// Register user route
app.post('/api/users/register', async (req, res) => {
  console.log("inside register")
  try {
    const { username, email, password, first_name, last_name } = req.body;
    // Add user to the database
    // Use parameterized queries to prevent SQL injection
    const newUser = await pool.query(
      'INSERT INTO public.users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, email, password, first_name, last_name]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// // Login user route
// app.post('/api/users/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // Authenticate user
//     // ... your authentication logic here
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Define other routes here...

// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
