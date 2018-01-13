export interface comment {
	id: number,
	text: string,
	parentTaskId: number,
	parentUserId: number
}

export const commentsDB: comment[] = [
	{
		id: 1,
		text: 'Hello there, good job on this!',
		parentTaskId: 1,
		parentUserId: 2
	},
	{
		id: 2,
		text: 'asdasdasdqw asdazxczxczxc',
		parentTaskId: 1,
		parentUserId: 3
	},
	{
		id: 3,
		text: 'qweqweqcxczxt cvxcvx werwffwfw',
		parentTaskId: 2,
		parentUserId: 1
	},
	{
		id: 4,
		text: '12312 13 123 13 1231 23123 ',
		parentTaskId: 3,
		parentUserId: 4
	},
	{
		id: 5,
		text: '23  24234232r 2222f f2ef f2 f2f 2f 2',
		parentTaskId: 3,
		parentUserId: 5
	},
	{
		id: 6,
		text: 'MYMYMYMYMYMYMYMY',
		parentTaskId: 3,
		parentUserId: 9
	},
	{
		id: 7,
		text: 'qweqwe',
		parentTaskId: 3,
		parentUserId: 9
	},
	{
		id: 8,
		text: 'qdwdq',
		parentTaskId: 3,
		parentUserId: 9
	},
	{
		id: 9,
		text: 'qweqweqwe',
		parentTaskId: 3,
		parentUserId: 9
	},
	{
		id: 10,
		text: 'qweqwe',
		parentTaskId: 3,
		parentUserId: 9
	},
	{
		id: 11,
		text: 'qweqwe',
		parentTaskId: 3,
		parentUserId: 9
	},
	{
		id: 12,
		text: 'qweqwe',
		parentTaskId: 3,
		parentUserId: 9
	},
	{
		id: 13,
		text: 'asdasdasd',
		parentTaskId: 3,
		parentUserId: 9
	}
]