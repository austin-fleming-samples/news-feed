<script lang="ts">
	import BreakingFeature from '$components/breaking-feature.svelte';
	import FeedSection from '$components/feed-section.svelte';
	import StoryPreview from '$components/post-preview/story-preview.svelte';
	import type { NormalizedStory } from '$lib/cms/models/story';
	import type { Nullable } from '$lib/utils/nullable';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let stories: NormalizedStory[];
	export let breakingStory: Nullable<NormalizedStory>;

	const expandedStoryStore = writable<string>('');
	setContext('currentExpandedStory', expandedStoryStore);
</script>

{#if breakingStory}
	<BreakingFeature
		title={breakingStory.title}
		summary={breakingStory?.summary?.content}
		timestamp={breakingStory.timestampModified || breakingStory.timestampPublished}
		href={`/stories/${breakingStory.slug.current}`}
	/>
{/if}

<!-- TODO: Have CMS field for title/description of sections  -->
<FeedSection title="Latest Stories" description="Rapid fire news to keep you in the loop.">
	{#each stories as story, _ (story._id)}
		<StoryPreview {story} />
	{/each}
</FeedSection>
