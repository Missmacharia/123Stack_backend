create or alter procedure deleteQuestion(@id varchar(50))
as 
begin
update questions set isDelete =1 where id=@id
end