CREATE TABLE saved_cocktails
(
    cocktailID INT,
    userId INT,
    addedDate DATE
);

INSERT INTO saved_cocktails
    (cocktailID, userId, addedDate)
VALUES
    (11007, 42, '2019-12-09');