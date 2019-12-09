const express = require('express');
//test
// note: the pool requirement will have to change
// based on if we're conducting local DB activity vs cloud activity
const pool = require('./connection');
const cocktaliRoutes = express.Router();
const notes = express.Router();

cocktaliRoutes.get('/login', (req, res) => {
  const sql = 'SELECT * FROM cocktali_user';
  pool.query(sql).then(result => {
    res.status('200');
    res.send(result.rows);
  });
  // TO DO: check if email/ pw from req matched db contents
  // yes: return unique user ID associated
  // no: return null
});
cocktaliRoutes.get('/signup', (req, res) => {
  // TO DO: send name, email, password
  // yes: if email is not already in DB, return new unique user ID
  // no: return null
});
cocktaliRoutes.get('/addnote', (req, res) => {
  // TO DO: POST note to notes table
  // yes: return something
  // no: return something
});
cocktaliRoutes.get('/notes', (req, res) => {
  const notesSql = 'SELECT * FROM notes_table';
  pool.query(notesSql).then(result => {
    if (result.rows.length === 0) {
      res.status(404);
    } else {
      res.status('200');
      res.send(result.rows);
    }
  });
});

cocktaliRoutes.post('/notes', (req, res) => {
  const note = req.body;

  const notesSql = `INSERT INTO notes_table (pinned, added, title, content, userID) 
VALUES ($1::BOOLEAN, $2::BOOLEAN, $3::VARCHAR, $4::VARCHAR, $5::INT) RETURNING*`;

  const params = [
    note.pinned,
    note.added,
    note.title,
    note.content,
    note.userID
  ];

  pool.query(notesSql, params).then(result => {
    res.status(201);
    res.json(result.rows);
  });
});

cocktaliRoutes.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const notesSql = `DELETE FROM notes_table WHERE id = $1::INT`;

  const params = [id];

  pool.query(notesSql, params).then(result => {
    res.sendStatus(204);
  });
});

cocktaliRoutes.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = req.body;

  const notesSql = `UPDATE notes_table 
SET pinned = $1::BOOLEAN, added = $2::BOOLEAN, title = $3::VARCHAR, content = $4::VARCHAR, userID = $5::INT
WHERE ID = $6::INT RETURNING *`;

  const params = [
    note.pinned,
    note.added,
    note.title,
    note.content,
    note.userID,
    id
  ];

  pool.query(notesSql, params).then(result => {
    res.json(result.rows);
  });
});

module.exports = cocktaliRoutes;