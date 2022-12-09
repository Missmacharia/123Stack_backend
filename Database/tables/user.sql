CREATE TABLE users
(
    id VARCHAR(20) PRIMARY KEY NOT NULL,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
)

INSERT INTO dbo.users
(id, username, email, password)
VALUES
('2542ebd5667w2dv', 'marville001', 'mwangimartin1904@gmail.com', 'P@ssw0rd123'),
('6534df653rd365e', 'yvonne', 'yvonnemacharia@gmail.com', 'P@ssw0rd456')