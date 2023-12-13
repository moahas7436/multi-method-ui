require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL client for Node.js
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const bodyParser = require('body-parser');

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
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Add user to the database
    // Use parameterized queries to prevent SQL injection
    const newUser = await pool.query(
      'INSERT INTO public.users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, email, hashedPassword, first_name, last_name]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// // Login user route
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user data from the database based on the provided email
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    // Check if a user with the provided email exists
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare the provided password with the hashed password in the database
    console.log(user)
    console.log(user.password)
    console.log(password)
    console.log(await bcrypt.compare(password, user.password))
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', {
      expiresIn: '1h', // Token expiration time
    });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Define other routes here...

// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
