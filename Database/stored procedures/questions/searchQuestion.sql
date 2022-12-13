 create or alter procedure searchQuestions(@question varchar(500))
 as 
 begin 
 select question from questions where question like '%' + @question +'%'
 end