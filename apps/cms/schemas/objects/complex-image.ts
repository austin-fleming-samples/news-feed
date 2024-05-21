export default {
	name: 'complexImage',
	title: 'Complex Image',
	type: 'image',
	description:
		'Only use high-resolution images (at least 1500px). Use the "hotspot" functionality under "edit" to ensure the image resizes well. Prefer photography that is simple, clear, and without stylized effects such as vignettes.',
	options: {
		hotspot: true
	},
	fields: [
		{
			name: 'alt',
			title: 'Alt Description*',
			type: 'string',
			description:
				'A description of the image used by search engines, assistive tools, and when the image fails to load. For example: "full moon over a still lake".',
			/* options: {
				isHighlighted: true
			}, */
			codegen: { required: true },
			validation: (Rule) => Rule.required()
		},
		{
			name: 'attribution',
			title: 'Attribution',
			// TODO: use a stripped-down block content to allow linking.
			type: 'string',
			description: 'A source or credit for the image. Often required for licensed images.'
			/* options: {
				isHighlighted: true
			} */
		},
		{
			name: 'caption',
			title: 'Caption',
			type: 'string',
			description:
				'A small description that will be displayed next to the image. Can help add explanation or context.'
			/* options: {
				isHighlighted: true
			} */
		}
	]
};
