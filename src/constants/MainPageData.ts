export const formatTitleNumber = (n: number | undefined): string =>
	n != null ? String(n).padStart(2, '0') : '';

export const TIMELINES = [
	{
		id: 0,
		titleID: 0,
		firstDate: '1930',
		secondDate: '1939',
	},
	{
		id: 1,
		titleID: 1,
		firstDate: '1946',
		secondDate: '1961',
	},
	{
		id: 2,
		titleID: 2,
		firstDate: '1980',
		secondDate: '1991',
	},
	{
		id: 3,
		titleID: 3,
		firstDate: '1994',
		secondDate: '2008',
	},
	{
		id: 4,
		titleID: 4,
		firstDate: '2015',
		secondDate: '2022',
	},
	{
		id: 5,
		titleID: 5,
		firstDate: '2022',
		secondDate: '2025',
	},

];

export const TITLES = [
	{
		id: 0,
		number: 1,
		title: 'Спорт'
	}, 
	{
		id: 1,
		number: 2,
		title: 'Политика'
	},
	{
		id: 2,
		number: 3,
		title: 'Культура'
	},
	{
		id: 3,
		number: 4,
		title: 'Общество'
	},
	{
		id: 4,
		number: 5,
		title: 'IT'
	},
	{
		id: 5,
		number: 6,
		title: 'Наука'
	},
]