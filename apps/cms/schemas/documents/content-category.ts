export default {
	name: 'contentCategory',
	title: 'Content Category',
	type: 'document',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title*',
			description:
				"Keep brief as possible and preferably one word. For example: Finance ✅, What's In Your Wallet ❌",
			codegen: { required: true },
			validation: (Rule) => [
				Rule.required(),
				Rule.max(15).warning('Try to shorten title to be (15) characters or less.')
			]
		}
	]
};
