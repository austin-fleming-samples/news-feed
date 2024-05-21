export default {
	name: 'linkExternal',
	title: 'Link External',
	type: 'object',
	fields: [
		{
			title: 'URL',
			name: 'href',
			type: 'url',
			description: 'Must begin with "https://"',
			validation: (Rule) => [
				Rule.uri({
					scheme: ['https']
				})
			]
		},
		{
			title: 'Sponsored Content',
			name: 'isSponsor',
			type: 'boolean',
			initialValue: false,
			description:
				"If the link goes to sponsored content (affiliate links, advertiser, etc.), then this should be selected. Search engines penalize pages that don't declare sponsored links."
		}
	]
};
