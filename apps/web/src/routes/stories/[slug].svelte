<!-- <script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import storyService from '$lib/cms/services/story.service';

	export const load: Load = async ({ params }) => {
		const { slug } = params;

		const story = await storyService.getBySlug(slug);

		return {
			status: story ? 200 : 404,
			props: {
				story
			}
		};
	};
</script> -->
<script lang="ts">
	import ArticleTemplate from '$components/article/article-template.svelte';
	import PlaceholderPage from '$components/common/placeholder-page.svelte';
	import type { NormalizedStory } from '$lib/cms/models/story';

	export let story: NormalizedStory;
</script>

<ArticleTemplate {story} />
