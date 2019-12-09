CREATE TABLE saved_cocktails
(
    savedId SERIAL PRIMARY KEY,
    cocktailId INT,
    userId INT,
    addedDate DATE
);

INSERT INTO saved_cocktails
    (cocktailID, userId, addedDate)
VALUES
    (11007, 42, '2019-12-09');