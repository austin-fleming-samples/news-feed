export default {
	name: 'quoteSection',
	title: 'Quote',
	type: 'object',
	fields: [
		{
			name: 'quote',
			title: 'Quote',
			type: 'text',
			rows: 5,
			description: 'Quotes longer than (300) characters will be truncated in the preview.',
			validation: (Rule) => [
				Rule.max(200).warning('Quote is longer than (200) characters. Consider shortening.'),
				Rule.max(300).warning(
					'Quote will be truncated. It is strongly recommended to keep quotes to (300) characters or less. Consider moving a portion of the quote into a body section.'
				),
				Rule.custom((quote) => {
					if (!quote) return true;

					const hasQuotationPunctuation =
						["'", '"', '‘', '’', '“', '”', '<', '>'].filter(
							(mark) => quote[0] === mark || quote[quote.length - 1] === mark
						).length > 0;

					if (hasQuotationPunctuation)
						return 'Do not place any form of quotation punctuation around quote.';

					return true;
				}).error(),
				Rule.required()
			]
		},
		{
			name: 'citation',
			title: 'Citation',
			type: 'text',
			rows: 2,
			description:
				'A brief "who, what, why" to accompany the quote. Citations longer than (150) characters will be truncated on cards.',
			validation: (Rule) => [
				Rule.max(150).warning(
					'Citation will be truncated. It is strongly recommended to keep citations under (150) characters. Consider moving extra information into a summary or body section.'
				),
				/* Rule.custom((citation, { parent }) =>
					!!parent.quote && !citation ? '"Quotes" must have an accompanying "Citation".' : true
				) */
				Rule.required()
			]
		}
	]
};
