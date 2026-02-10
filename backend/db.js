const { Pool } = require('pg');

const pool = new Pool({
  user: 'narva_user',
  host: 'localhost',   // kung local machine
  database: 'narva_sales',
  password: 'narva_pass',
  port: 5432,
});

module.exports = pool;
