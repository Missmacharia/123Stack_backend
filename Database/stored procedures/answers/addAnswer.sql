create or alter procedure addAnAnswer(@id varchar(50), @userId varchar(50), @questionId varchar(50), @answer varchar(500), @upVote int, @downVote int)
 as 
 begin
 insert into answers(id, userId, questionId, answer,upVote, downVote)
 values(@id, @userId, @questionId, @answer, @upVote, @downVote)
 end