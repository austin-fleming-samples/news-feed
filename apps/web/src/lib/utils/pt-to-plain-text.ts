import type { GeneralBlockContent } from '$lib/cms/models/general-block-content';

export const ptToPlainText = (blocks: GeneralBlockContent): string =>
	blocks
		// loop through each block
		.map((block) => {
			// if it's not a text block with children,
			// return nothing
			if (block._type !== 'block' || !block.children) {
				return '';
			}
			// loop through the children spans, and join the
			// text strings
			return block.children.map((child) => child.text).join('');
		})
		.join(' ');
/* // join the paragraphs leaving split by two linebreaks
			.join('\n\n') */
