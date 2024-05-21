// TODO: refactor
// TODO: doesn't seem to work correctly

// @ts-expect-error: built-in type
import sanityClient from 'part:@sanity/base/client';
const client = sanityClient.withConfig({ apiVersion: '2022-01-21' });

const removeDraftPrefix = (id: string): string => id.replace(/^drafts\.$/, '');

const addDraftPrefix = (id: string): string => `drafts.${id}`;

const addDraftPrefixOnce = (id: string): string => addDraftPrefix(removeDraftPrefix(id));

type OptionsProperties = {
	document: {
		_id: string;
	};
};
export const slugIsUnique = async (slug: string, options: OptionsProperties): Promise<boolean> => {
	const { document } = options;
	const id = document._id;

	const publishedId = removeDraftPrefix(id);
	const draftId = addDraftPrefixOnce(id);

	const parameters = {
		draft: draftId,
		published: publishedId,
		slug: slug
	};

	const isUniqueSlugQuery = `!defined(*[(_id in [$draft, $published]) && !(slug.current == $slug)][0]._id)`;

	return await client.fetch(isUniqueSlugQuery, parameters);
};
