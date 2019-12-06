const express = require("express");
//test
// note: the pool requirement will have to change
// based on if we're conducting local DB activity vs cloud activity
const pool = require("./connection");
const cocktaliRoutes = express.Router();
const notes = express.Router();

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
notes.get('/notes', (req, res) => {
  const notesSql = "SELECT * FROM notes";
  pool.query(notesSql).then(result => {
    res.status('2oo');
    res.send(result);
  })
});

notes.post('/notes', (req, res) => {});

notes.delete('/notes', (req, res) => {});

notes.put('/notes', (req, res) => {});

module.exports = cocktaliRoutes;