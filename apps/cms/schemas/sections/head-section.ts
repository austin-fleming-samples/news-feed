export default {
	name: 'headSection',
	title: 'Head',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title*',
			type: 'string',
			validation: (Rule) => [
				Rule.required(),
				Rule.max(150).error('"Title" must be (150) characters or less')
			]
		},
		{
			name: 'contentCategory',
			title: 'Category*',
			type: 'reference',
			to: [{ type: 'contentCategory' }],
			validation: (Rule) => Rule.required()
		},
		{
			name: 'coverImage',
			title: 'Cover Image',
			type: 'complexImage'
		}
	]
};
