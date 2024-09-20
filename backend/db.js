const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'brishna_user',
  host: 'localhost',
  database: 'brishna_accountancy',
  password: 'yourpassword',
  port: 5432, // Default port for PostgreSQL
});

pool.connect((err) => {
  if (err) {
    console.error('Failed to connect to PostgreSQL database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database.');
  }
});

module.exports = pool;