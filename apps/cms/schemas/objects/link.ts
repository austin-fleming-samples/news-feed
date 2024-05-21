export default {
	name: 'link',
	title: 'Link',
	type: 'object',
	fields: [
		{
			title: 'Type of Link',
			name: 'linkType',
			type: 'string',
			options: {
				list: [
					{ title: 'External', value: 'external' },
					{ title: 'Internal', value: 'internal' },
					{ title: 'Page', value: 'internalReference' }
				],
				layout: 'radio'
			},
			description: '(required)',
			codegen: { required: true },
			validation: (Rule) => Rule.required().error('"Type of Link" is missing.')
		},
		{
			name: 'linkExternal',
			title: 'External',
			type: 'linkExternal',
			description: '(required)',
			hidden: ({ parent }) => parent.linkType !== 'external',
			validation: (Rule) =>
				Rule.custom((linkExternal, { parent }) =>
					parent.linkType === 'external' && !linkExternal.href ? 'Oh nooooo' : true
				)
		},
		{
			title: 'Page',
			name: 'internalReference',
			type: 'reference',
			description: '(required)',
			hidden: ({ parent }) => parent.linkType !== 'internalReference',
			to: [{ type: 'story' }],
			validation: (Rule) =>
				Rule.custom((internalReference, { parent }) =>
					parent.linkType === 'internalReference' && !internalReference
						? '"Internal Link" is required if "Type of Link" is set to "Page".'
						: true
				)
		},
		{
			title: 'Path',
			name: 'path',
			type: 'url',
			description: '(required) For example: /support-us/donations',
			hidden: ({ parent }) => parent.linkType !== 'internal',
			validation: (Rule) =>
				Rule.uri({
					allowRelative: true,
					relativeOnly: true
				})
					.custom((path) => {
						if (!path) return true;

						return (
							path.startsWith('/') ||
							'Must start with a "/" and follow a "/page/another-page" format.'
						);
					})
					.custom((path, { parent }) =>
						parent.linkType === 'internal' && !path
							? '"Path" is required when "Type of Link" is set to "Internal".'
							: true
					)
		}
	]
};
