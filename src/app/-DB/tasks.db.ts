export interface task {
	id: number,
	line: string,
	parentDeskId: number
}

export const tasksDB: task[] = [
	{
		id: 1,
		line: 'Change design --------',
		parentDeskId: 3
	},
	{
		id: 2,
		line: 'Adsdasdad --------',
		parentDeskId: 1
	},
	{
		id: 3,
		line: 'zxczxczxc -------',
		parentDeskId: 2
	},
	{
		id: 4,
		line: 'utyutyut ---------',
		parentDeskId: 3
	},
	{
		id: 5,
		line: '234234---234234---234',
		parentDeskId: 3
	},
	{
		id: 6,
		line: 'ASDdc asda  as  ',
		parentDeskId: 1
	},
	{
		id: 7,
		line: 'qwewqe qer erwetwt  r ',
		parentDeskId: 1
	},
	{
		id: 8,
		line: 'Long live a king, long live queen, long live kingdom',
		parentDeskId: 1
	},
	{
		id: 9,
		line: '234234---234234---234',
		parentDeskId: 1
	},
	{
		id: 10,
		line: '234234---234234---234',
		parentDeskId: 1
	},
	{
		id: 11,
		line: '234234---234234---234',
		parentDeskId: 1
	},
	{
		id: 12,
		line: '234234---234234---234',
		parentDeskId: 1
	},
	{
		id: 13,
		line: '234234---234234---234',
		parentDeskId: 1
	},
	{
		id: 14,
		line: '234234---234234---234',
		parentDeskId: 1
	},
	{
		id: 15,
		line: '234234---234234---234',
		parentDeskId: 1
	}
]