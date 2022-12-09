CREATE TABLE answers
(
    id VARCHAR(20) PRIMARY KEY NOT NULL,
    userId VARCHAR(20) FOREIGN KEY REFERENCES users NOT NULL,
    questionId VARCHAR(20) FOREIGN KEY REFERENCES questions NOT NULL,
    answer VARCHAR(500) NOT NULL
);

INSERT INTO dbo.answers
(id, userId, questionId, answer)
VALUES
('sud7647612332sd', '2542ebd5667w2dv', '0934dgw62367dff', 'Very good. try this solution'),
('gfw5635626dfwwe', '6534df653rd365e', 'kfdj434ew874284', 'Also try this link it will help')
--('3465dggs6545634', '6534df653rd365e', 'kfdj434ew874284', 'Another answer for this one')