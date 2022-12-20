--get answers procedures
 create or alter procedure getAnswers(@questionId varchar(30))
 as 
 begin
 select *from answers where questionId=@questionId
 end
