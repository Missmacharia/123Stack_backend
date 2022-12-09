SELECT
    q.id questionId, q.title, q.question,
    a.answer
FROM  dbo.questions q  INNER JOIN dbo.answers a
ON q.id = a.questionId WHERE q.id = 'kfdj434ew874284'