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

// get entire notes database
cocktaliRoutes.get("/notes", (req, res) => {
  const notesSql = "SELECT * FROM notes_table";

  pool.query(notesSql).then(result => {
    if (result.rows.length === 0) {
      // if there are notes, we receive them
      // if not, then we receive error
      res.status(404);
      res.json({
        error: `404 not found`
      });
    } else {
      res.status("200");
      res.send(result.rows);
    }
  });
});

// get notes by id
cocktaliRoutes.get("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const notesSql = "SELECT * FROM notes_table WHERE id = $1::INT";
  const params = [id];

  pool.query(notesSql, params).then(result => {
    if (result.rows.length === 0) {
      // Response status: 404
      res.status(404);
      res.json({
        error: `ID ${id} not found`
      });
    } else {
      res.json(result.rows);
    }
  });
});

// add a new note
cocktaliRoutes.post("/notes", (req, res) => {
  let d = new Date(); // date constructor

  // string constructors below so we parse the date into strings
  let day = String(d.getDate()).padStart(2, "0");
  let month = String(d.getMonth() + 1).padStart(2, "0");
  let year = String(d.getFullYear());
  let date = `${year}-${month}-${day}`;

  console.log(`Today is ${month} - ${day} - ${year}`); // quick test

  const note = req.body;
  console.log(note);
  if (note.pinned === "")
    note.pinned = false;

  const notesSql = `INSERT INTO notes_table (pinned, added, title, content, userID) 
VALUES ($1::BOOLEAN, $2::DATE, $3::VARCHAR, $4::VARCHAR, $5::INT) RETURNING*`;

  const params = [note.pinned, date, note.title, note.content, note.userID];

  pool.query(notesSql, params).then(result => {
    res.status(201);
    res.json(result.rows);
  });
});

// delete note by id
cocktaliRoutes.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const notesSql = `DELETE FROM notes_table WHERE id = $1::INT`;

  const params = [id];

  pool.query(notesSql, params).then(result => {
    res.sendStatus(204);
  });
});

// edit note
cocktaliRoutes.put("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = req.body;

  let d = new Date(); // date constructor

  // string constructors for parsing integers to string
  let day = String(d.getDate()).padStart(2, "0");
  let month = String(d.getMonth() + 1).padStart(2, "0");
  let year = String(d.getFullYear());
  let date = `${year}-${month}-${day}`;

  const notesSql = `UPDATE notes_table 
SET pinned = $1::BOOLEAN, added = $2::DATE, title = $3::VARCHAR, content = $4::VARCHAR, userID = $5::INT
WHERE ID = $6::INT RETURNING *`;

  const params = [note.pinned, date, note.title, note.content, note.userID, id];

  pool.query(notesSql, params).then(result => {
    res.json(result.rows);
  });
});

//
// FAVORITES SECTION FOR SERVING AND ADDING FAVS
//
cocktaliRoutes.get("/favs", (req, res) => {
  const sql = "SELECT * FROM saved_cocktails";
  pool.query(sql).then(result => {
    res.status(200);
    res.json(result.rows);
  });
});
cocktaliRoutes.post("/favs", (req, res) => {
  console.log("awergwae");
  const newFav = req.body;
  const sql =
    "INSERT INTO saved_cocktails (cocktailID, userId, addedDate) VALUES ($1::INT, $2::INT, $3::DATE);";
  const params = [newFav.cocktailId, newFav.userId, "2019-12-09"];
  console.log(newFav.cocktailId);
  //
  //  TO DO: IMPLEMENT FRESH DATE THERE ^^^^^^^^^
  //
  pool.query(sql, params).then(result => {
    res.status(201);
    res.json("");
  });
});
cocktaliRoutes.delete("/favs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  sql = "delete from saved_cocktails where savedId = $1::int";
  params = [id];
  pool.query(sql, params).then(result => {
    res.status(200);
    res.send();
  });
});

module.exports = cocktaliRoutes;