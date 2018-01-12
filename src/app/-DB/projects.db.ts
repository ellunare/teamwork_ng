export const projectColors = [
	[
		'red',
		'#ff0020',
		0
	],
	[
		'gold',
		'#ffe100',
		1
	],
	[
		'green',
		'#00ff90',
		2
	],
	[
		'blue',
		'#0055ff',
		3
	],
	[
		'purple',
		'#a100ff',
		4
	]
]

export interface project {
	id: number,
	name: string,
	description: string,
	color: (string | number),
	parentTeamId: number,
	userFavId: number[]
}

export const projectsDB: project[] = [
	{
		id: 1,
		name: 'Tesla mobile',
		description: 'Make corporate site',
		color: projectColors[3][1],
		parentTeamId: 1,
		userFavId: []
	},
	{
		id: 2,
		name: 'Wordpress theme',
		description: 'Opencart store',
		color: projectColors[1][1],
		parentTeamId: 2,
		userFavId: []
	},
	{
		id: 3,
		name: 'Coffee sales',
		description: 'Landing page',
		color: projectColors[2][1],
		parentTeamId: 2,
		userFavId: []
	}
]