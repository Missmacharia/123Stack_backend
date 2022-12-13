create or alter procedure passVotes (@id varchar(50),@upVote int, @downVote int)
as
begin
if @upvote = 1
begin 
update answers set @upVote = 1 where id=@id
end
else 
begin 
update answers set @downVote = 0 where id= @id
end
end