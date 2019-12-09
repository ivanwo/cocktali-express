
CREATE TABLE notes_table
(
  id SERIAL PRIMARY KEY,
  pinned BOOLEAN,
  added DATE(8),
  title VARCHAR(255),
  content VARCHAR(255),
  userID INT
);

INSERT INTO notes_table
  (pinned, added, title, content, userID)
VALUES
  (TRUE, '1000-01-01', 'Zoink', 'Drink is good', 12);

-- The DATE type is used for values with a date part but no time part. 
-- MySQL retrieves and displays DATE values in 'YYYY-MM-DD' format. 
-- The supported range is '1000-01-01' to '9999-12-31'.