export default {
	// TODO: maybe rename to sourceLinks
	name: 'outlinksSection',
	title: 'Out Links',
	type: 'object',
	description: 'Links to other platforms or sponsors relevant to the story.',
	fields: [
		{
			name: 'outlinks',
			type: 'array',
			title: 'Links',
			of: [
				{
					name: 'outlink',
					type: 'object',
					title: 'Link',
					fields: [
						{
							// TODO: maybe rename to Source Name
							name: 'outletName',
							type: 'string',
							title: 'Outlet Name',
							description:
								'(required) Name of outlet. Use abbreviations or short names where possible. For example: NPR, Axios, NYT, WSJ',
							codegen: { required: true },
							validation: (Rule) => [
								Rule.max(12).warning(
									'Try to shorten the outlet name to (12) characters or less. Otherwise, it may not fit on smaller screens.'
								),
								Rule.required()
							]
						},
						{
							name: 'link',
							type: 'linkExternal',
							title: 'Link',
							description: '(required)',
							codegen: { required: true },
							validation: (Rule) => [
								Rule.required(),
								Rule.custom((link) => (!link.href ? '"Link" must have an "URL" value.' : true))
							]
						}
					]
				}
			]
		}
	]
};
