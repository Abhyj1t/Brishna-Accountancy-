const { Pool } = require('pg');

const pool = new Pool({
  user: 'brishna_user',
  host: 'localhost',
  database: 'brishna_accountancy',
  password: 'yourpassword',
  port: 5432, // Default port for PostgreSQL
});

module.exports = pool;