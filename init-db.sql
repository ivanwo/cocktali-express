CREATE TABLE cocktali_user (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

INSERT INTO cocktali_user (name, email, password)
VALUES ('Ivan', 'ivan@ivan.me', 'ivanpassword');
INSERT INTO cocktali_user (name, email, password)
VALUES ('Reu', 'reu@reu.me', 'reupassword');
INSERT INTO cocktali_user (name, email, password)
VALUES ('Kenney', 'kenney@kenney.me', 'kenneypassword');
