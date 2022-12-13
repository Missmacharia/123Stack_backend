--add a question procedure
create procedure addQuestion(@id varchar(20), @userId varchar(20), @title varchar(100), @question varchar(5000))
as 
begin
insert into questions(id, userId, title, question)
values(@id, @userId, @title, @question)
end