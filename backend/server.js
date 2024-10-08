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

// Create a route to handle forgot password requests
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
    const tokenExpiration = Date.now() + 3600000; // Token valid for 1 hour

    // Save the reset token and expiration in the database (assume you have `reset_token` and `token_expiry` columns)
    await pool.query(
      'UPDATE users SET reset_token = $1, token_expiry = $2 WHERE email = $3',
      [resetToken, tokenExpiration, email]
    );

    // Create a reset link to send via email
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    // Send the email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // You can use any email service
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password', // Use environment variables in production
      },
    });

    const mailOptions = {
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset</p><p>Click this <a href="${resetLink}">link</a> to reset your password</p>`,
    };

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

app.post('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find user by token
    const userQuery = await pool.query('SELECT * FROM users WHERE reset_token = $1 AND token_expiry > $2', [token, Date.now()]);
    
    if (userQuery.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = userQuery.rows[0];

    // Hash the new password (consider using bcrypt)
    const hashedPassword = password; // Replace this with bcrypt.hash(password) for security

    // Update user's password and clear the reset token
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
