require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL client for Node.js
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { Client } = require('pg');


// Initialize Express app
const app = express();

app.use(cors());
app.use(express.json()); 


const client = new Client({
  user: 'postgres',
  host: 'database-2.cgrhbmmrnxxj.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'password',
  port: 5432, // PostgreSQL default port
  ssl: {
    rejectUnauthorized: false
}
// const pool = new client({
//   connectionString: 'postgres://postgres:Mh@129901@localhost:5432/master',
//   password: 'Mh@129901', // Make sure it's enclosed in quotes,
//   user: 'postgres',

//   // If you're using SSL, you'll need to add the following (Heroku requires this, for example)
//   // ssl: {
//   //   rejectUnauthorized: false
//   // }
//   port: 5432, // PostgreSQL default port
// });

client.connect(function(err) {
  if (err) {
    console.log('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});
// Basic route for testing if the server is running
app.get('/', (req, res) => {
  res.send('Hello, your server is up and running!');

});

// Register user route
app.post('/api/users/register', async (req, res) => {
  const date_joined = new Date(); // Get the current date and time


  console.log("inside register")
  try {
    console.log("Inside try block")
    const { username, email, password, first_name, last_name } = req.body;
    const saltRounds = 10; 
    const password_hash = await bcrypt.hash(password, saltRounds);
    // Add user to the database
    // Use parameterized queries to prevent SQL injection
    const newUser = await client.query(
      'INSERT INTO public.users (username, email, password_hash, first_name, last_name, date_joined) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, email, password_hash, first_name, last_name, date_joined]
    );
    // console.log(newUser.rows[0])
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
    const result = await client.query(query, [email]);

    // Check if a user with the provided email exists
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare the provided password with the hashed password in the database
  
    // console.log(await bcrypt.compare(password, user.password_hash))
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

 // Generate a JWT token for the authenticated user
 const token = jwt.sign({ userId: user.user_id }, 'your_secret_key', {
  expiresIn: '1h', // Token expiration time
});

// Include user_id in the response
res.json({ token, user_id: user.user_id });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add session data

app.post('/api/save-session', async (req, res) => {
  try {
    const { method, userId, methodId, startTime, endTime, duration, notes, feedback } = req.body;
    // console.log('-------REQUEST BODY HERE -------------' + JSON.stringify(req.body))

    // Insert the study session data into the study_sessions table
    const query = `
        INSERT INTO study_sessions (method, user_id, method_id, start_time, end_time, duration, notes, feedback)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING session_id`;

    const values = [method, userId, methodId, startTime, endTime, duration, notes, feedback];

    const result = await client.query(query, values);
    console.log(result)
    res.status(201).json({ session_id: result.rows[0].session_id });
} catch (error) {
    console.error('Error saving study session:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});
// Get session history

app.get('/api/get-session-history', async (req, res) => {
  const userId = req.query.userId;

  try {
      // Fetch session history data 
      const query = 'SELECT method, session_id, user_id, method_id, start_time, end_time, duration, notes, feedback FROM study_sessions WHERE user_id = $1;';
      const result = await client.query(query, [userId]);

      // Send the fetched session history data as JSON response
      res.json(result.rows);
  } catch (error) {
      console.error('Error fetching session history:', error);
      res.status(500).json({ error: 'Server error' });
  }
});
// Set the port
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
