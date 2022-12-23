create or alter procedure getAUsersQuestions(@userId varchar(50))
as
begin 
select *from questions where @userId= userId
end