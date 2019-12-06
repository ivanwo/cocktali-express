  const {
    Pool
  } = require('pg');
  //const connectionString = 'postgresql://postgres:david-password@localhost:5432/postgres';
  const pool = new Pool({
    user: "postgres",
    password: "david-password",
    host: "localhost",
    port: 5432,
    database: "postgres",
    ssl: false
  });

  module.exports = pool;