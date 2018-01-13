export interface section {
	id: number,
	name: string,
	description: string,
	parentProjectId: number
}

export const sectionsDB: section[] = [
	{
		id: 1,
		name: 'CEO',
		description: 'making wordpress great again',
		parentProjectId: 1
	},
	{
		id: 2,
		name: 'MARKETING',
		description: 'For the future!',
		parentProjectId: 1
	},
	{
		id: 3,
		name: 'SALES',
		description: 'Sold for beer',
		parentProjectId: 2
	},
	{
		id: 4,
		name: 'Lalala',
		description: 'Future holds',
		parentProjectId: 1
	},
	{
		id: 5,
		name: 'Great Again !',
		description: 'Nothing to look at',
		parentProjectId: 1
	}
]

export const sectionsDB_DEF: section[] = [
	{
		id: -1,
		name: 'FRONT-END',
		description: 'Front-end section',
		parentProjectId: -1
	},
	{
		id: -1,
		name: 'BACK-END',
		description: 'Back-end section',
		parentProjectId: -1
	},
	{
		id: -1,
		name: 'DESIGN',
		description: 'Design section',
		parentProjectId: -1
	}
]