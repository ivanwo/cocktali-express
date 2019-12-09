
CREATE TABLE notes_table
(
  id SERIAL PRIMARY KEY,
  pinned BOOLEAN,
  added DATE,
  title VARCHAR(255),
  content VARCHAR(255),
  userID INT
);

INSERT INTO notes_table
  (pinned, added, title, content, userID)
VALUES
  (TRUE, TRUE, 'Zoink', 'Drink is good', 12);
