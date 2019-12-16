  // const {
  //   Pool
  // } = require('pg');
  // //const connectionString = 'postgresql://postgres:david-password@localhost:5432/postgres';
  // const pool = new Pool({
  //   user: "postgres",
  //   password: "password",
  //   host: "localhost",
  //   port: 5432,
  //   database: "cocktali-express",
  //   ssl: false
  // });

  // module.exports = pool;

  // --------HEROKU ---------//

  const {
    Pool
  } = require('pg');
  try {
    // When not running via Heroku, this will load the .env file.
    require('dotenv').config();
  } catch (e) {
    // When running with Heroku, dotenv doesn't need to be available.
  }
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({
    connectionString: connectionString,
    ssl: !connectionString.includes('localhost')
  });

  module.exports = pool;