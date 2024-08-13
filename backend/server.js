// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(morgan('dev')); // Log HTTP requests to the console
app.use(express.json()); // Parse incoming JSON requests

// Basic route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

// Import and use routes
const indexRoute = require('./src/routes/index');
app.use('/api', indexRoute);

// Server listening on the specified port (default is 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});