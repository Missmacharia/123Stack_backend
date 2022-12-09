 create procedure signInuser(@id varchar(20), @username varchar(20), @email varchar(100), @password varchar(500))
 as 
 begin
 insert into users(id, username, email, password)
 values( @id, @username, @email, @password)
 end