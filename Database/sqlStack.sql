-- --CREATE DATABASE StackExchange2;


-- CREATE TABLE users
-- (
--     id VARCHAR(20) PRIMARY KEY NOT NULL,
--     username VARCHAR(20) NOT NULL,
--     email VARCHAR(100) NOT NULL unique,
--     password VARCHAR(500) NOT NULL,
-- 	--isActive BIT
-- )



-- drop table users


-- CREATE TABLE questions
-- (
--     id VARCHAR(20) PRIMARY KEY NOT NULL,
--     userId VARCHAR(20) FOREIGN KEY REFERENCES users NOT NULL,
--     title VARCHAR(100) NOT NULL,
--     question VARCHAR(500) NOT NULL

-- 	--FOREIGN KEY (userId) REFERENCES users on delete cascade on update cascade
-- )



-- CREATE TABLE answers
-- (
--     id VARCHAR(20) PRIMARY KEY NOT NULL,
--     userId VARCHAR(20) FOREIGN KEY REFERENCES users NOT NULL,
--     questionId VARCHAR(20) FOREIGN KEY REFERENCES questions NOT NULL,
--     answer VARCHAR(500) NOT NULL
-- );



-- CREATE TABLE comments
-- (
--     id VARCHAR(20) PRIMARY KEY NOT NULL,
--     userId VARCHAR(20) FOREIGN KEY REFERENCES users NOT NULL,
--     answerId VARCHAR(20) FOREIGN KEY REFERENCES answers NOT NULL,
--     comment VARCHAR(500) NOT NULL
-- )


-- -- INSERT DATA
-- INSERT INTO dbo.users
-- (id, username, email, password)
-- VALUES
-- ('2542ebd5667w2dv', 'marville001', 'mwangimartin1904@gmail.com', 'P@ssw0rd123'),
-- ('6534df653rd365e', 'yvonne', 'yvonnemacharia@gmail.com', 'P@ssw0rd456')





-- INSERT INTO dbo.questions
-- (id, userId, title, question)
-- VALUES
-- ('0934dgw62367dff', '2542ebd5667w2dv', 'How to return from the outer function from the callback of setState?', 'How to return from the outer function from the callback of setState?'),
-- ('kfdj434ew874284', '6534df653rd365e', 'python speechrecognition app on kivy not working', 'python speechrecognition app on kivy not working')



-- INSERT INTO dbo.answers
-- (id, userId, questionId, answer)
-- VALUES
-- --('sud7647612332sd', '2542ebd5667w2dv', '0934dgw62367dff', 'Very good. try this solution'),
-- ---('gfw5635626dfwwe', '6534df653rd365e', 'kfdj434ew874284', 'Also try this link it will help'),
-- ('3465dggs6545634', '6534df653rd365e', 'kfdj434ew874284', 'Another answer for this one')



-- INSERT INTO dbo.comments
-- (id, userId, answerId, comment)
-- VALUES
-- ('09576364deweff', '2542ebd5667w2dv', '3465dggs6545634', 'How to return from the outer function from the callback of setState?'),
-- ('bo094394746sdd', '6534df653rd365e', '3465dggs6545634', 'echrecognition app on kivy not working')





-- -- FETCH DATA



-- SELECT * FROM dbo.users;
-- SELECT * FROM dbo.questions;
-- SELECT * FROM dbo.answers;
-- SELECT * FROM dbo.comments;




-- SELECT
--     q.id questionId, q.title, q.question,
--     a.answer
-- FROM  dbo.questions q  INNER JOIN dbo.answers a
-- ON q.id = a.questionId WHERE q.id = 'kfdj434ew874284'
-- --FOR JSON PATH, INCLUDE_NULL_VALUES


-- -- --get questions procedure
-- create procedure getQuestions
--  as 
--  begin
--  select *from questions
--  end


 

-- -- --get a question procedure
--  create procedure getQuestion(@id varchar(20))
--  as
--  begin
--  select *from questions where id=@id
--  end


-- -- --add a question procedure
--  create procedure addQuestion(@id varchar(20), @userId varchar(20), @title varchar(100), @question varchar(5000))
--  as 
--  begin
--  insert into questions(id, userId, title, question)
--  values(@id, @userId, @title, @question)
--  end


-- --delete question

-- -- --get answers procedures
--  create procedure getAnswers
--  as 
--  begin
--  select *from answers
--  end

-- --add An answer procedure
--  create procedure addAnAnswer(@id varchar(20), @userId varchar(20), @questionId varchar(20), @answer varchar(500))
--  as 
--  begin
--  insert into answers(id, userId, questionId, answer)
--  values(@id, @userId, @questionId, @answer)
--  end

-- -- --get comments procedures
-- create procedure getComments
-- as
-- begin
--  select *from comments
-- end

-- -- --add comment procedure
--  create procedure addComment(@id varchar(20), @userId varchar(20), @answerId varchar(20), @comment varchar(500))
--  as
--  begin
--  insert into comments(id, userId, answerId, comment)
--  values(@id, @userId, @answerId, @comment)
--  end

--  create procedure signInuser(@email varchar(100))
--  as 
--  begin
--  select *from users where email =@email
--  end
 
--  create procedure loginUser(@email varchar(100))
--  as 
--  begin
--  select *from users where email = @email
--  end

--   select *from users where email = 'yvonnemacharia@gmail.com'

--  execute loginUser 'yvonnemacharia@gmail.com'

