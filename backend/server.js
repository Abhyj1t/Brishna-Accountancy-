const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Database connection
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Password hashing
const crypto = require('crypto'); // Token generation
const nodemailer = require('nodemailer'); // For sending email

const app = express();

// Enable CORS
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware to parse JSON requests
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

// Contact form route
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

// Signup route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
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

// Login route
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

// Forgot password route
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    // Check if the user exists
    const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const user = userQuery.rows[0];

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Generate a timestamp for token expiration (1 hour from now) in ISO format
    const tokenExpiration = new Date(Date.now() + 3600000).toISOString(); // ISO format for PostgreSQL

    // Save the reset token and expiration in the database
    await pool.query(
      'UPDATE users SET reset_token = $1, token_expiry = $2 WHERE email = $3',
      [resetToken, tokenExpiration, email]
    );

    // Create a reset link to send via email
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset</p><p>Click this <a href="${resetLink}">link</a> to reset your password</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Reset password route
app.post('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const userQuery = await pool.query('SELECT * FROM users WHERE reset_token = $1 AND token_expiry > $2', [token, Math.floor(Date.now() / 1000)]);
    if (userQuery.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = userQuery.rows[0];
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('UPDATE users SET password = $1, reset_token = NULL, token_expiry = NULL WHERE id = $2', [hashedPassword, user.id]);

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
