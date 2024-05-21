import type { Nullable } from '../nullable';
import { formatDate } from './format-date';

const units = {
	year: 24 * 60 * 60 * 1000 * 365,
	month: (24 * 60 * 60 * 1000 * 365) / 12,
	week: 7 * 24 * 60 * 60 * 1000,
	day: 24 * 60 * 60 * 1000,
	hour: 60 * 60 * 1000,
	minute: 60 * 1000,
	second: 1000
};

const msTo = (unit: keyof typeof units, milliseconds: number) =>
	Math.floor(milliseconds / units[unit]);

/* const dateDefaults = {
	locale: 'en',
	options: { numeric: 'auto' }
}; */

/* const buildTimeFormatter = () =>
	new Intl.RelativeTimeFormat(dateDefaults.locale, dateDefaults.options); */

export const dateToTimeSince = (date: Date): string => {
	const now = new Date();
	const msPast = now.getTime() - date.getTime();

	if (msPast < units.minute) return `${msTo('second', msPast)}s ago`;

	if (msPast < units.hour) return `${msTo('minute', msPast)} min. ago`;

	if (msPast < units.day) return `${msTo('hour', msPast)} hours ago`;

	if (msPast < units.week) return `${msTo('month', msPast)} days ago`;

	// NOTE: only show "ago" for up to a week. After that, just show date.
	return formatDate(date);
};
