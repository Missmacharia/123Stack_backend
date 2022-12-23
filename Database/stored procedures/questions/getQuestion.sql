--get a question procedure
create procedure getQuestion(@id varchar(20))
as
begin
select *from questions where id=@id and isDelete = 0 
end
