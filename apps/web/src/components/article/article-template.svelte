<script lang="ts">
	import YoutubePlayer from '$components/elements/youtube-player.svelte';
	import getYoutubeId from 'get-youtube-id';

	import Chip from '$components/ui/chip.svelte';
	import type { NormalizedStory } from '$lib/cms/models/story';
	import { formatDate } from '$lib/utils/time/format-date';
	import ArticleBody from './article-body.svelte';
	import Breadcrumbs from './breadcrumbs.svelte';
	export let story: NormalizedStory;
</script>

<article class="w-full max-w-5xl mx-auto px-sitepad pb-24">
	<header class="py-12 md:py-16 flex flex-col gap-8">
		<Breadcrumbs {story} />

		<h1 class="text-3xl md:text-4xl font-bold">{story.title}</h1>

		<!-- TODO: date gets formatted in multiple places. consider centralizing at query -->
		<div class="flex flex-col items-start gap-4 md:gap-2">
			<div class="flex flex-col md:flex-row gap-2 md:gap-4 text-sm items-start md:items-center">
				<time datetime={story.timestampPublished}
					>{formatDate(new Date(story.timestampPublished))}</time
				>

				{#if story.timestampModified}
					<Chip>
						<time datetime={story.timestampModified}
							>updated {formatDate(new Date(story.timestampModified))}</time
						>
					</Chip>
				{/if}
			</div>

			<span class="font-bold text-sm md:text-base">{story.readTimeMinutes} min. read</span>
		</div>

		{#if story.coverImage?.asset}
			<figure>
				<img src={story.coverImage.asset.url} alt={story.coverImage.alt} />

				{#if story.coverImage.attribution || story.coverImage.caption}
					<figcaption>
						<small>{story.coverImage.attribution}</small>
						<p>{story.coverImage.caption}</p>
					</figcaption>
				{/if}
			</figure>
		{/if}

		{#if story.coverVideo?.url}
			<figure>
				<YoutubePlayer id={getYoutubeId(story.coverVideo.url)} />
				<!-- <img src={story.coverImage.asset.url} alt={story.coverImage.alt} />

				{#if story.coverImage.attribution || story.coverImage.caption}
					<figcaption>
						<small>{story.coverImage.attribution}</small>
						<p>{story.coverImage.caption}</p>
					</figcaption>
				{/if} -->
			</figure>
		{/if}
	</header>

	<div class="w-full max-w-3xl mx-auto flex flex-col gap-9">
		<section>
			{#if story.quote?.quote}
				<!-- TODO: this and associated styles are nearly identical to /preview-quote.svelte and can be made DRY -->
				<blockquote
					class="quote relative w-full pl-4 py-[0.5em] flex flex-col gap-4 text-lg md:text-2xl font-semibold leading-snug mb-8"
				>
					<p>“{story.quote.quote}”</p>
					<footer class="quote__citation">
						<p>{story.quote.citation}</p>
					</footer>
				</blockquote>
			{/if}

			{#if story.body?.content}
				<ArticleBody blocks={story.body.content} />
			{/if}
		</section>

		{#if story.tags}
			<section>
				<h2 class="font-bold">Tags</h2>

				<div class="mt-4 flex flex-row flex-wrap gap-2 justify-start font-bold">
					{#each story.tags as tag (tag.title)}
						<Chip>{tag.title}</Chip>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</article>

<style>
	.quote:after {
		content: '';
		@apply absolute top-0 bottom-0 left-0 w-[3px] bg-background-lesser rounded-full;
	}
	.quote__citation {
		@apply text-base font-normal;
	}
</style>
