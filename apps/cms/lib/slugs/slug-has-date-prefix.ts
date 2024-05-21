// TODO: Refactor

type MaybeNumber = false | number;
type MaybeString = false | string;
type MaybeDate = Date | string;

const isNumber = (value: any): boolean => !Number.isNaN(value);

const coarceToNumber = (value: any): number => Number.parseInt(value);

const coarceToNumberWithCheck = (value: any): MaybeNumber =>
	isNumber(value) && coarceToNumber(value);

const getFirstNChars = (string_: string, numberChars: number): string =>
	string_.slice(0, numberChars);

const getMaybeDatePrefix = (slug: string): MaybeString => getFirstNChars(slug, 8);

const isDate = (maybeDate: unknown): boolean =>
	Object.prototype.toString.call(maybeDate) === '[object Date]';

const canParseYYYYMMDD = (string_: MaybeString): boolean => {
	try {
		if (!string_) return false;

		const isCorrectLength = string_.length === 8;
		if (!isCorrectLength) return false;

		const year = coarceToNumberWithCheck(string_.slice(0, 4));
		const month = coarceToNumberWithCheck(string_.slice(4, 6));
		const day = coarceToNumberWithCheck(string_.slice(6, 8));
		if (!year || !month || !day) return false;

		const isValidYear: boolean = year >= 2000;
		const isValidMonth: boolean = month > 0 && month <= 12;
		const isValidDay: boolean = day > 0 && day <= 31;
		if (!(isValidYear && isValidMonth && isValidDay)) return false;

		const date = new Date(year, month - 1, day);
		if (!isDate(date)) return false;
	} catch (error) {
		console.error(
			`Date check failed at canConvertToDate in slugHasDatePrefix.\nError: ${error.message}`
		);
		return false;
	}
	return true;
};

const hasDatePrefix = (input: string): true | string =>
	canParseYYYYMMDD(getMaybeDatePrefix(input))
		? true
		: '"Slug" must start with the date in YYYYMMDD format. ex. 20210512-post-name';

type MaybeSlugProperties = { current: undefined | string };
export const slugHasDatePrefix = (slug: MaybeSlugProperties): true | string =>
	slug?.current
		? hasDatePrefix(slug.current)
		: '"Slug" must start with the date in YYYYMMDD format. ex. 20210512-post-name';
