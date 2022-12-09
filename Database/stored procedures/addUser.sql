--add a user procedure
create procedure addUser(@id varchar(50), @username varchar(20), @email varchar(50), @password varchar(200))
as
begin
insert into users(id, username, email, password)
values(@id, @username,@email, @password)
end