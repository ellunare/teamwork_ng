export interface user {
	id: number,
	name: string,
	email: string,
	password: string,
	parentTeamId: number,
	avatar: string
}

export const usersDB: user[] = [
	{
		id: 1,
		name: 'Victor',
		email: 'victor2@mail.com',
		password: 'qwe',
		parentTeamId: 1,
		avatar: 'https://cbsradionews.files.wordpress.com/2017/02/pre-grammy-gala-31.jpg?w=640&h=360&crop=1'
	},
	{
		id: 2,
		name: 'Alex',
		email: 'victor2@mail.com',
		password: 'qwe',
		parentTeamId: 2,
		avatar: 'http://s3.amazonaws.com/cdn.roosterteeth.com/uploads/images/36437c1c-f403-42c3-a3a0-4886a49bd012/original/2195219-1449924847806-image-2.jpg'
	},
	{
		id: 3,
		name: 'Darvin',
		email: 'victor2@mail.com',
		password: 'qwe',
		parentTeamId: 1,
		avatar: 'https://michiganross.umich.edu/sites/default/files/images/profiles/koustav-de.jpg'
	},
	{
		id: 4,
		name: 'Stas',
		email: 'stas@gmail.com',
		password: 'qwe',
		parentTeamId: -1,
		avatar: 'https://st3.depositphotos.com/3591429/14512/i/950/depositphotos_145126057-stock-photo-handsome-man-face-profile.jpg'
	},
	{
		id: 5,
		name: 'Calvin',
		email: 'victor2@mail.com',
		password: 'qwe',
		parentTeamId: 3,
		avatar: 'https://cap.stanford.edu/profiles/viewImage?profileId=19141&type=square&ts=1509532892453'
	},
	{
		id: 6,
		name: 'Alison',
		email: 'alison@gmail.com',
		password: 'qwe',
		parentTeamId: 3,
		avatar: 'https://weconnectinternational.org/images/news/Australasia/McKeith_Amanda.jpg'
	},
	{
		id: 8,
		name: 'Dan',
		email: 'victor2@mail.com',
		password: 'qwe',
		parentTeamId: 3,
		avatar: 'https://s3.amazonaws.com/aspph-wp-production/app/uploads/2017/03/Ans-.jpg'
	},
	{
		id: 9,
		name: '123',
		email: '123',
		password: '123',
		parentTeamId: -1,
		avatar: '../../assets/img/avatar_def.jpg'
	},
	{
		id: 10,
		name: 'Agnet',
		email: '211',
		password: '123',
		parentTeamId: 3,
		avatar: 'https://files-chemistry-stanford-edu.s3-us-west-2.amazonaws.com/s3fs-public/styles/large-square/public/6f7cfac1bb56a62439c00419a9325342.jpg?hYfzh6m1L0rZleLKHo2Dpx3wSBPYqx5s&itok=jakTa4yC'
	},
	{
		id: 11,
		name: 'Lerrou',
		email: 'tyu',
		password: '123',
		parentTeamId: 3,
		avatar: 'https://i.pinimg.com/736x/e9/4c/76/e94c765eccf119e8c8f351747788d74b--face-profile-stuff-to-buy.jpg'
	},
	{
		id: 12,
		name: 'Danked',
		email: 'wqqq',
		password: '123',
		parentTeamId: 3,
		avatar: 'https://cap.stanford.edu/profiles/viewImage?profileId=41710&type=square&ts=1509503257160'
	}
	
]