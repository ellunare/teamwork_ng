export interface desk {
	id: number,
	line: string,
	parentSectionId: number
}

export const desksDB: desk[] = [
	{
		id: 1,
		line: 'Make new logo',
		parentSectionId: 3
	},
	{
		id: 2,
		line: 'Data base not working',
		parentSectionId: 1
	},
	{
		id: 3,
		line: 'Need stability improvements',
		parentSectionId: 2
	},
	{
		id: 4,
		line: 'New section to add',
		parentSectionId: 3
	},
	{
		id: 5,
		line: 'Advertising slogan for commercial',
		parentSectionId: 3
	},
	{
		id: 6,
		line: 'Little changes',
		parentSectionId: 3
	}
]