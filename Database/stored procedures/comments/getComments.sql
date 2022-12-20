--get comments procedures
create or alter procedure getComments(@answerId varchar(50))
as
begin
 select *from comments where answerId=@answerId
end