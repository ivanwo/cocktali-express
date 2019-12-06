  
CREATE TABLE notes_table (
  id SERIAL PRIMARY KEY,
  pinned BOOLEAN,
  added BOOLEAN,
  title VARCHAR(255),
  content VARCHAR(255),
  userID INT, 
);

INSERT INTO api_student (pinned, added, title, content, userID)
VALUES (TRUE, TRUE, 'Zoink','Drink is good',);
