const express = require("express");
//test
// note: the pool requirement will have to change
// based on if we're conducting local DB activity vs cloud activity
const pool = require("./connection");
const cocktaliRoutes = express.Router();

cocktaliRoutes.get("/login", (req, res) => {
  const sql = "SELECT * FROM cocktali_user";
  pool.query(sql).then(result => {
    res.status("200");
    res.send(result.rows);
  });
  // TO DO: check if email/ pw from req matched db contents
  // yes: return unique user ID associated
  // no: return null
});
cocktaliRoutes.get("/signup", (req, res) => {
  // TO DO: send name, email, password
  // yes: if email is not already in DB, return new unique user ID
  // no: return null
});
cocktaliRoutes.get("/addnote", (req, res) => {
  // TO DO: POST note to notes table
  // yes: return something
  // no: return something
});
module.exports = cocktaliRoutes;
