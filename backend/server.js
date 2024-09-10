const express = require('express'); 
const pool = require('./db'); // Import the PostgreSQL connection pool
const cors = require('cors'); // If you're handling requests from a different frontend, this helps avoid CORS issues
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors()); // Allow Cross-Origin requests (important if frontend is hosted separately)
app.use(bodyParser.json()); // Parse incoming JSON requests

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

// Route to delete a booking by ID
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).json({ error: 'Database error' });
    } else if (result.rows.length === 0) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
});

// Route to update a booking by ID
app.put('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, service, booking_date, booking_time } = req.body;
  pool.query(
    'UPDATE bookings SET name = $1, email = $2, service = $3, booking_date = $4, booking_time = $5 WHERE id = $6 RETURNING *',
    [name, email, service, booking_date, booking_time, id],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).json({ error: 'Database error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Booking not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    }
  );
});

// Route to handle contact form submission (NEW ROUTE)
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});