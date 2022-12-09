create procedure addAnAnswer(@id varchar(20), @userId varchar(20), @questionId varchar(20), @answer varchar(500))
as 
begin
insert into answers(id, userId, questionId, answer)
values(@id, @userId, @questionId, @answer)
end