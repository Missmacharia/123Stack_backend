CREATE TABLE comments
(
    id VARCHAR(20) PRIMARY KEY NOT NULL,
    userId VARCHAR(20) FOREIGN KEY REFERENCES users NOT NULL,
    answerId VARCHAR(20) FOREIGN KEY REFERENCES answers NOT NULL,
    comment VARCHAR(500) NOT NULL
)

INSERT INTO dbo.comments
(id, userId, answerId, comment)
VALUES
('09576364deweff', '2542ebd5667w2dv', 'sud7647612332sd', 'How to return from the outer function from the callback of setState?'),
('bo094394746sdd', '6534df653rd365e', 'gfw5635626dfwwe', 'echrecognition app on kivy not working')
