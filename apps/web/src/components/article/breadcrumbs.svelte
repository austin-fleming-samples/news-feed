<script lang="ts">
	import GeneralIcon from '$components/icons/general-icon.svelte';
	import type { NormalizedStory } from '$lib/cms/models/story';
	import type { Expand } from '$lib/utils/expand';
	import { toSlug } from '$lib/utils/to-slug';
	import { truncate } from '$lib/utils/truncate';
	export let story: NormalizedStory;

	type Breadcrumb = {
		label: string;
		to: string;
	};

	type RootBreadcrumb = Expand<Breadcrumb & { children?: Breadcrumb[] }>;

	type Breadcrumbs = Array<Breadcrumb | RootBreadcrumb>;

	// TODO: centralize the creation of category and tag slugs.
	// TODO: centralize the truncation of title
	const breadcrumbs: Breadcrumbs = [
		{
			label: 'Home',
			to: '/'
		},
		{
			label: story.contentCategory.title,
			to: `/categories/${toSlug(story.contentCategory.title)}`
		},
		{
			label: story.tags[0].title,
			to: `/tags/${toSlug(story.tags[0].title)}`
		},
		{
			label: truncate(story.title, 15),
			to: `/article/${story.slug.current}`
		}
	];
</script>

<!-- TODO: implement more robust crumbs like https://web.dev/building-a-breadcrumbs-component/ -->
<!-- TODO: cleanup chevron implementation -->
<!-- TODO: have dropdown on mobile instead of vanishing -->
<nav class="hidden md:block">
	<ul class="flex flex-row items-center gap-2">
		{#each breadcrumbs as { label, to }, index (label)}
			<li
				class="flex flex-row whitespace-nowrap items-center leading-none gap-1 text-[10px] md:text-sm"
			>
				<a href={to} class:font-bold={index === breadcrumbs.length - 1}>{label}</a>
				{#if index < breadcrumbs.length - 1}
					<GeneralIcon name="chevronRight" size="0.75em" />
				{/if}
			</li>
		{/each}
	</ul>
</nav>
