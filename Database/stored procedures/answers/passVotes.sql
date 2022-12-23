create or alter procedure passvotes (@answerId varchar(50),@userId varchar(50), @upVote int, @downVote int)
as
begin
if exists(select *from passVote where userId= @userId and answerId= @answerId)
begin
update passVote set upVote = @upVote , downVote = @downVote where answerId= @answerId
end 
else
begin
insert into passVote(answerId , userId , upVote , downVote )
values(@answerId, @userId, @upVote, @downVote)
end
end