import { DEFAULT_LIMIT } from '$lib/cms/config';
import { ptToPlainText } from '$lib/utils/pt-to-plain-text';
import { privateClient } from '../client.private';
import type { ExpandedStory, NormalizedStory } from '../models/story';

/* 
################# 
HELPERS
################# 
*/

const textToReadTime = (text: string) => Math.ceil(text.split(' ').length / 200);

// TODO: calculate this cms-side to reduce runs
const getStoryReadTime = (story: ExpandedStory) => {
	const title = story.title;
	const summary = story?.summary?.content || '';
	const quote = story?.quote?.quote || '';
	const quoteCitation = story?.quote?.citation || '';
	// TODO: will need to be a PT-to-plain-text function
	const body = (story?.body?.content && ptToPlainText(story.body.content)) || '';

	return textToReadTime(title + summary + quote + quoteCitation + body);
};

const normalizeStory = (story: ExpandedStory): NormalizedStory => ({
	...story,
	readTimeMinutes: getStoryReadTime(story)
});

/* 
################# 
QUERIES
################# 
*/

const expandedStoryQueryProjection = `
{
	...,
	contentCategory->,
	coverImage{
		...,
		asset->
	},
	tags[]->,
	body {
		...,
		content[] {
			...,
      _type=="complexImage" => {
        ...,
        asset ->
      },
      markDefs[] {
        ...,
        linkType == "internalReference" => {
          ...,
          internalReference->
        }
      }
		}
	}
}
`;

const buildStoryQuery = (slug: string) => `
	*[_type == "story" && slug.current == "${slug}"]
	[0]
	${expandedStoryQueryProjection}
	`;

const buildStoriesQuery = (limit: number, offset: number, filter?: string) => {
	const cursor = offset * limit;

	const filterStatement = filter ? `&& ${filter}` : '';

	return `
  *[_type == "story" ${filterStatement}]
	| order(coalesce(timestampModified, timestampPublished) desc)
	| order((isBreaking == true) desc)
	[${cursor}...${cursor + limit}]
  ${expandedStoryQueryProjection}
  `;
};

/* 
################# 
FETCHERS
################# 
*/

const getAll = async (limit = DEFAULT_LIMIT, offset = 0): Promise<NormalizedStory[]> => {
	const query = buildStoriesQuery(limit, offset);

	const maybeStories = await privateClient.fetch<ExpandedStory[]>(query);

	if (!maybeStories) return [];

	// TODO: figure out only getting published stories via query instead of here
	const publishedStories = maybeStories.filter((story) => !story?._id?.startsWith('draft'));

	return publishedStories.map(normalizeStory);
};

const getBreaking = async (limit = DEFAULT_LIMIT, offset = 0): Promise<NormalizedStory[]> => {
	const query = buildStoriesQuery(limit, offset, 'isBreaking == true');

	const maybeBreakingStories = await privateClient.fetch<ExpandedStory[]>(query);

	if (!maybeBreakingStories) return [];

	const publishedStories = maybeBreakingStories.filter((story) => !story?._id?.startsWith('draft'));

	return publishedStories.map(normalizeStory);
};

const getBySlug = async (slug: string): Promise<NormalizedStory | undefined> => {
	const query = buildStoryQuery(slug);

	const maybeStory = await privateClient.fetch<ExpandedStory>(query);

	if (!maybeStory) return;

	return normalizeStory(maybeStory);
};

export default {
	getAll,
	getBreaking,
	getBySlug
};
