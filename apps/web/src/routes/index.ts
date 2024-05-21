import storyService from '$lib/cms/services/story.service';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (request) => {
	const stories = await storyService.getAll();
	const breakingStories = await storyService.getBreaking();

	const breakingStory =
		breakingStories?.length && breakingStories.length > 0 ? breakingStories[0] : undefined;

	if (stories)
		return {
			body: { stories, breakingStory },
			status: 200
		};

	return { status: 400, body: undefined };
};
