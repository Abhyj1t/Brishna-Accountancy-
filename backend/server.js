const express = require('express'); 
const pool = require('./db'); // Import the PostgreSQL connection pool
const cors = require('cors'); 
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors()); 
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
    'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
    [name, email, message],
    (err, result) => {
      if (err) {
        console.error('Error storing message:', err.stack);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.status(201).json({ message: 'Message sent successfully!' });
      }
    }
  );
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});