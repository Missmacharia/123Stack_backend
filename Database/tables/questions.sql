CREATE TABLE questions
(
    id VARCHAR(20) PRIMARY KEY NOT NULL,
    userId VARCHAR(20) FOREIGN KEY REFERENCES users NOT NULL,
    title VARCHAR(100) NOT NULL,
    question VARCHAR(500) NOT NULL
)

INSERT INTO dbo.questions
(id, userId, title, question)
VALUES
('0934dgw62367dff', '2542ebd5667w2dv', 'How to return from the outer function from the callback of setState?', 'How to return from the outer function from the callback of setState?'),
('kfdj434ew874284', '6534df653rd365e', 'python speechrecognition app on kivy not working', 'python speechrecognition app on kivy not working')