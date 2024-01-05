const { Pool } = require('pg');

const pool = new Pool({
  user: 'jennieines',
  host: 'localhost',
  database: 'itemscanner',
  password: '343270',
  port: 5432,
});

module.exports = pool;
