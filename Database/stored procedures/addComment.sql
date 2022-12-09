--add comment procedure
create procedure addComment(@id varchar(20), @userId varchar(20), @answerId varchar(20), @comment varchar(500))
as
begin
insert into comments(id, userId, answerId, comment)
values(@id, @userId, @answerId, @comment)
end