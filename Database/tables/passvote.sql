create table passVote(
answerId varchar(50) foreign key references answers not null,
upVote int default 1,
	downVote int default -1,
	voteCount int default 0
)