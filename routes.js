const express = require("express");
//test
// note: the pool requirement will have to change
// based on if we're conducting local DB activity vs cloud activity
const pool = require("./connection");
const cocktaliRoutes = express.Router();
const notes = express.Router();

cocktaliRoutes.get("/login", (req, res) => {
  // If the request has a ?name= parameter, only respond w/ matching students
  // if (req.query.name) {
  //   const sql = "SELECT * FROM cocktali_user";
  //   // const params = ["%" + req.query.name + "%"];
  //   pool.query(sql, params).then(result => {
  //     // .json sends response as send Status "Success"
  //     res.status(200); // ❌❌IVAN DOUBLE CHECK THIS❌❌
  //     res.send(result.rows);
  //   });
  // } else {
  //   // else respond with ALL students.
  const sql = "SELECT * FROM cocktali_user";
  pool.query(sql).then(result => {
    // .json sends response as status Failure
    res.status("200"); //❌❌IVAN DOUBLE CHECK THIS❌❌
    res.send(result.rows);
  });
  // }
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
    res.status('200');
    res.send(result);
  })
});

notes.post('/notes', (req, res) => {});

notes.delete('/notes', (req, res) => {});

notes.put('/notes', (req, res) => {});

module.exports = cocktaliRoutes;