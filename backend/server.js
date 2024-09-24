const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Assuming you have set up a connection pool in db.js
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const app = express();

// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:3000' })); // Allows requests from localhost:3000

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Route to get all bookings
app.get('/api/bookings', (req, res) => {
  pool.query('SELECT * FROM bookings', (err, result) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Route to create a new booking
app.post('/api/bookings', (req, res) => {
  const { name, email, service, booking_date, booking_time } = req.body;
  pool.query(
    'INSERT INTO bookings (name, email, service, booking_date, booking_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, email, service, booking_date, booking_time],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.status(201).json(result.rows[0]);
      }
    }
  );
});

// Route to handle contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  pool.query(
    'INSERT INTO contact_form_submissions (name, email, message) VALUES ($1, $2, $3) RETURNING *',
    [name, email, message],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.status(201).json(result.rows[0]);
      }
    }
  );
});

// Route to handle signup form submission
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('Error executing query:', err.stack);
          res.status(500).json({ error: 'Database error' });
        } else {
          res.status(201).json(result.rows[0]);
        }
      }
    );
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Route to handle login form submission
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    async (err, result) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).json({ error: 'Database error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const user = result.rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          res.status(200).json({ message: 'Login successful', user });
        } else {
          res.status(401).json({ error: 'Invalid password' });
        }
      }
    }
  );
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
