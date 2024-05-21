export default {
  title: "Banner",
  name: "banner",
  type: "document",
  __experimental_actions: ["create", "update", "publish", "delete"],
  fields: [
    /* {
			title: 'Navigation',
			name: 'navigation',
			type: 'object',
			description: 'Navbar links',
			fields: [
				{
					title: 'Links',
					name: 'links',
					type: 'array',
					description: '(required)',
					of: [
						{
							title: 'Navigation Item',
							name: 'navItem',
							type: 'cta'
						}
					],
					codegen: { required: true },
					validation: (Rule) => Rule.required().min(1).error('"Links" is missing.')
				}
			],
			codegen: { required: true },
			validation: (Rule) => Rule.required().error('"Navigation" is missing.')
		}, */
    {
      title: "Banner",
      name: "banner",
      type: "object",
      description: "Banner that appears over the header",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          title: "Show Banner",
          name: "isActive",
          type: "boolean",
          initialValue: false,
          codegen: { required: true },
          validation: (Rule) =>
            Rule.required().error('"Show Banner" is missing.'),
        },
        {
          title: "Link",
          name: "link",
          type: "link",
          validation: (Rule) =>
            Rule.custom((link, { parent }) =>
              parent.isActive && !link
                ? 'Banner must have "Link" if "Show Banner" is selected.'
                : true
            ),
        },
        {
          title: "Chip",
          name: "chip",
          type: "string",
          description:
            'A small label that helps draw attention. For example: "Sale!"',
          validation: (Rule) =>
            Rule.max(12).error(
              '"Chip" should be (12) characters or less. Space is very limited in the banner.'
            ),
        },
        {
          title: "Content",
          name: "content",
          type: "text",
          codegen: { required: true },
          validation: (Rule) => [
            Rule.custom((content, { parent }) =>
              parent.isActive && !content
                ? 'Banner must have "Content" if "Show Banner" is selected.'
                : true
            ),
            Rule.max(70).warning('Try to keep "Content" brief as possible.'),
            Rule.max(300).error('"Content" must be (300) characters or less.'),
          ],
        },
      ],
    },
  ],
};
