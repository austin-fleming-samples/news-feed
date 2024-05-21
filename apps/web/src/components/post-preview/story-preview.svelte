<script lang="ts">
	import YoutubePlayer from '$components/elements/youtube-player.svelte';
	import getYoutubeId from 'get-youtube-id';
	import {
		PREVIEW_CITATION_MAX_LENGTH,
		PREVIEW_QUOTE_MAX_LENGTH,
		PREVIEW_SUMMARY_MAX_LENGTH
	} from '$config/content-settings';

	import type { NormalizedStory } from '$lib/cms/models/story';
	import PostPreview from './post-preview.svelte';
	import PreviewQuote from './preview-quote.svelte';
	import PreviewSummary from './preview-summary.svelte';

	export let story: NormalizedStory;

	const {
		title,
		contentCategory,
		_id,
		coverImage,
		coverVideo,
		slug,
		quote,
		summary,
		outlinks,
		timestampPublished,
		timestampModified,
		readTimeMinutes,
		body,
		isBreaking
	} = story;

	const path = `/stories/${slug.current}`;

	const truncatedSummary =
		summary?.content &&
		summary.content.length > PREVIEW_SUMMARY_MAX_LENGTH &&
		`${summary.content.slice(0, PREVIEW_SUMMARY_MAX_LENGTH)}...`;

	const truncatedQuote =
		quote?.quote &&
		quote.quote.length > PREVIEW_QUOTE_MAX_LENGTH &&
		`${quote.quote.slice(0, PREVIEW_QUOTE_MAX_LENGTH)}...`;

	const truncatedCitation =
		quote?.citation &&
		quote.citation.length > PREVIEW_CITATION_MAX_LENGTH &&
		`${quote.citation.slice(0, PREVIEW_CITATION_MAX_LENGTH)}...`;

	const hasBody = !!body;

	const showLinkToArticle = hasBody || truncatedSummary || truncatedQuote || truncatedCitation;
</script>

<PostPreview
	{title}
	id={_id}
	category={contentCategory.title}
	timestamp={timestampPublished}
	{timestampModified}
	mainImage={coverImage}
	mainVideo={coverVideo}
	slug={slug.current}
	{isBreaking}
>
	{#if coverVideo?.url}
		<div class="w-full rounded-lg overflow-hidden">
			<YoutubePlayer id={getYoutubeId(coverVideo.url)} />
		</div>
	{/if}

	{#if quote?.quote}
		<PreviewQuote quote={quote.quote} citation={quote?.citation} />
	{/if}

	{#if summary?.content}
		<PreviewSummary summary={summary.content} />
	{/if}

	<div class="w-full flex flex-col gap-2">
		{#if showLinkToArticle}
			<div class="w-full flex flex-row justify-between items-center">
				<a
					href={path}
					class="w-full py-[0.7em] px-[1.5em] bg-primary transition-colors duration-150 hover:bg-accent1 text-background rounded-lg text-sm font-bold flex flex-row justify-between"
					><span>Keep Reading</span><span class="whitespace-nowrap text-sm font-normal"
						>{readTimeMinutes} min. read</span
					></a
				>
			</div>
		{/if}

		{#if outlinks?.outlinks}
			{#each outlinks.outlinks as { _key, link, outletName }, _ (_key)}
				<!-- Needs rel -->
				<a
					href={link.href}
					target="blank"
					class="w-full py-[0.7em] px-[1.5em] bg-background-less text-primary-less rounded-lg text-sm font-bold flex flex-row gap-1"
					>on {outletName}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						class="mt-[0.25em]"
						width="0.8em"
						height="0.8em"
						viewBox="0 0 30 30"
						><path
							fill="currentColor"
							d="M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z"
						/></svg
					>
				</a>
			{/each}
		{/if}

		{#if !showLinkToArticle}
			<a
				href={path}
				class="w-full pt-[0.7em] pb-0 px-[1.5em] text-primary rounded-xl text-xs tracking-wider underline font-bold text-center"
				>View Article</a
			>
		{/if}
	</div>
</PostPreview>
