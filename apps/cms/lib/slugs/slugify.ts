// TODO: refactor

// import vendorSlugify from '@sindresorhus/slugify'
import { pipe } from './../helpers/pipe';
// import { pipe } from 'shared';

type CharacterTableProperties = {
	illegalChars: string;
	replaceChars: string;
};
const characterTable: CharacterTableProperties = Object.freeze({
	illegalChars:
		'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;@#?',
	replaceChars: 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz---------'
});

const getLastChar = (inputString: string): string => inputString.at(-1);

const removeLastChar = (string_: string): string => string_.slice(0, -1);

const removeAll = (string_: string, char: string): string => string_.split(char).join('');

const replaceAllWith = (string_: string, charToRemove: string, delimeter: string): string =>
	string_.split(charToRemove).join(delimeter);

const getNFirstChars = (string_: string, n: number): string => string_.slice(0, n);

const replaceIllegalChars = (
	string_: string,
	characterTable: CharacterTableProperties,
	startIndex = 0
): string =>
	startIndex === characterTable.illegalChars.length
		? string_
		: replaceIllegalChars(string_, characterTable, startIndex + 1);

const replaceAllSpaces = (string_: string): string => replaceAllWith(string_, ' ', '-');

const trimTrailingSpaces = (string_: string): string =>
	getLastChar(string_) === ' ' ? trimTrailingSpaces(removeLastChar(string_)) : string_;

const normalizeCharacters = (string_: string): string =>
	replaceIllegalChars(string_, characterTable);

const getYearMonthDay = (dateStamp: string): string => {
	const trimmedDate = removeAll(dateStamp, '-');
	return getNFirstChars(trimmedDate, 8);
};

const makeLowerCase = (string_: string): string => string_.toLowerCase();

const validateTitle = (title: string): string => {
	if (!title) {
		throw new Error('No title provided.');
	}

	return title;
};

const handleSlugifyError = (error: Error) => {
	throw new Error(`Failed to create slug. Error: ${error.message}`);
};

/// ///////////////////////////

// export const getSlugSource = (document_: { title: string }): string => document_.title;

export const getSlugSourceWithDate = ({
	title,
	timestampPublished
}: {
	timestampPublished: string;
	title: string;
}): {
	date: string;
	title: string;
} => Object.freeze({ date: timestampPublished, title });

/// ///////////////////////////
const slugify = (string_: string) =>
	string_
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, '');

export const customSlugify = (title: string): string => {
	try {
		return pipe(
			validateTitle,
			makeLowerCase,
			trimTrailingSpaces,
			replaceAllSpaces,
			normalizeCharacters,
			slugify
		)(title);
	} catch (error) {
		handleSlugifyError(error);
	}
};

export const slugifyWithDate = ({ title, date }: { date: string; title: string }): string => {
	if (!date) {
		throw new Error('"Publish Date" must be set to generate slug');
	}

	const slug = customSlugify(title);
	const slugDate = getYearMonthDay(date);

	return `${slugDate}-${slug}`;
};
