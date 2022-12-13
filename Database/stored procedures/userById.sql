create or alter procedure userById(@id varchar(50))
 as
 begin
 select *from users where id= @id
 end