const express = require("express");
//test
// note: the pool requirement will have to change
// based on if we're conducting local DB activity vs cloud activity
const pool = require("./connection");
const cocktaliRoutes = express.Router();

cocktaliRoutes.get("/login", (req, res) => {
  // If the request has a ?name= parameter, only respond w/ matching students
  if (req.query.name) {
    const sql = "SELECT * FROM cocktali_express WHERE name LIKE $1::TEXT";
    const params = ["%" + req.query.name + "%"];
    pool.query(sql, params).then(result => {
      // .json sends response as send Status "Success"
      res.status("Success"); // ❌❌IVAN DOUBLE CHECK THIS❌❌
    });
  } else {
    // else respond with ALL students.
    const sql = "SELECT * FROM cocktali_express";
    pool.query(sql).then(result => {
      // .json sends response as status Failure
      res.status("404") //❌❌IVAN DOUBLE CHECK THIS❌❌
    });
  }
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