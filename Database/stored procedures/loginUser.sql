 create procedure loginUser(@id varchar(20))
 as 
 begin
 select *from users where id= @id
 end