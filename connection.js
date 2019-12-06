  const {
    Pool
  } = require('pg');
  //const connectionString = 'postgresql://postgres:david-password@localhost:5432/postgres';
  const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cocktali-express",
    ssl: false
  });

  module.exports = pool;