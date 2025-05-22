const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test connection immediately
pool.query('SELECT NOW()')
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('PostgreSQL connection error', err.stack));

module.exports = { pool };