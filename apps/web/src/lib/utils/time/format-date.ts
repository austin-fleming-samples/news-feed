const monthsTable = {
	0: 'Jan',
	1: 'Feb',
	2: 'Mar',
	3: 'Apr',
	4: 'May',
	5: 'Jun',
	6: 'Jul',
	7: 'Aug',
	8: 'Sep',
	9: 'Oct',
	10: 'Nov',
	11: 'Dec'
};

export const formatDate = (date: Date) => {
	const month = monthsTable[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
	const minutes = date.getMinutes();
	const timeSuffix = date.getHours() >= 12 ? 'pm' : 'am';

	const time = `${hours}:${minutes}${timeSuffix}`;

	return `${month} ${day}, ${year} ${time}`;
};
