export default {
	title: 'Call to Action',
	name: 'cta',
	type: 'object',
	fields: [
		{
			title: 'Label',
			name: 'label',
			type: 'string',
			description: '(required)',
			codegen: { required: true },
			validation: (Rule) => Rule.required().error('"Label" is missing.')
		},
		{
			title: 'Link',
			name: 'link',
			type: 'link',
			description: '(required)',
			options: {
				collapsible: true,
				collapsed: true
			},
			codegen: { required: true },
			validation: (Rule) => Rule.required().error('"Link" is missing.')
		}
	]
};
