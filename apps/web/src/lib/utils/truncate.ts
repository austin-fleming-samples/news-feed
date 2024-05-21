export const truncate = (stringToTruncate: string, length: number) => {
	if (stringToTruncate.length <= length) return stringToTruncate;

	const normalizedLength = Math.floor(length);

	const trimmedString = stringToTruncate.slice(0, normalizedLength).trim();

	return `${trimmedString}...`;
};
