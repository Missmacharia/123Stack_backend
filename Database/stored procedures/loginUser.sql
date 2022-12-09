 create or alter procedure loginUser(@email varchar(20))
 as 
 begin
 select *from users where email= @email
 end