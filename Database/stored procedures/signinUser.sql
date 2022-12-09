 create procedure signInuser(@email varchar(50))
 as 
 begin
 select *from users where email =@email
 end