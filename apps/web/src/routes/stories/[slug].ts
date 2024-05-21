import type { NormalizedStory } from '$lib/cms/models/story';
import storyService from '$lib/cms/services/story.service';
import type { RequestHandler } from '@sveltejs/kit';

type Parameters = { slug: string };
type Output = { status: 200; story: NormalizedStory } | { status: 404; body: undefined };

export const get: RequestHandler<Parameters, Output> = async ({ params }) => {
	const { slug } = params;

	const story = await storyService.getBySlug(slug);

	if (!story) return { status: 404, body: undefined };

	return {
		status: 200,
		body: { story }
	};
};
