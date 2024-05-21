export default {
	name: 'tag',
	type: 'document',
	title: 'Tag',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title*',
			codegen: { required: true },
			validation: (Rule) => Rule.required()
		}
	]
};
