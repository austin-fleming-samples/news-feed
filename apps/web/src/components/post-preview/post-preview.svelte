<script lang="ts">
	import type { ExpandedComplexImage } from '$lib/cms/models/complex-image';
	import type { YoutubeEmbed } from '$lib/cms/models/youtube-embed';

	// REF: expansion: https://www.digitalocean.com/community/tutorials/css-collapsible
	import type { Nullable } from '$lib/utils/nullable';
	import { dateToTimeSince } from '$lib/utils/time/date-to-time-since';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import getYoutubeId from 'get-youtube-id';

	const currentStoryIdStore = getContext<Writable<string>>('currentExpandedStory');

	export let isExpanded = false;

	export let isBreaking = false;

	export let id: string;

	export let slug: string;

	export let category: string;

	export let title: string;
	// TODO: have some kind of pre-processing to simplify images down to something more agnostic
	export let mainImage: Nullable<ExpandedComplexImage>;
	export let mainVideo: Nullable<YoutubeEmbed>;

	export let timestamp: string;
	export let timestampModified: Nullable<string>;

	$: isExpanded = id === $currentStoryIdStore;
</script>

<article class="preview" class:selected={isExpanded} class:breaking={isBreaking}>
	<header
		class="section__header"
		on:click={() => {
			$currentStoryIdStore = id;
		}}
	>
		<div class="w-full grid grid-cols-[1fr_auto]">
			{#if isBreaking}
				<span
					class="block justify-self-start px-[1em] py-[0.3em] text-xs font-bold tracking-wider uppercase bg-[#FFDAA3] text-primary-less rounded"
					>Breaking</span
				>
			{:else}
				<span class="text-sm font-bold text-accent1 leading-none">{category}</span>
			{/if}

			<button
				type="button"
				class="text-xs text-primary-less font-bold tracking-wider leading-none flex flex-row flex-nowrap gap-1 hover:text-accent1"
				on:click={() => {
					window.alert(`Share story with the slug: ${slug}`);
				}}
				aria-label="share story"
				><svg
					class="mt-[0.02rem]"
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="0.7rem"
					height="0.7rem"
					viewBox="0 0 30 30"
					><path
						fill="currentColor"
						d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"
					/></svg
				> Share</button
			>
		</div>

		<div class="w-full flex flex-row flex-nowrap items-start justify-between">
			<h1
				class="block w-3/4 md:w-4/5 pr-4 text-lg md:text-xl md:leading-[1.2] font-bold leading-tight"
			>
				{title}
			</h1>

			{#if mainImage?.asset?.url}
				<figure class="relative w-1/4 md:w-1/5 rounded-md overflow-hidden">
					<div class="relative w-full pb-[100%] ">
						<img class="main-image" src={mainImage.asset.url} alt={mainImage.alt} />
					</div>
				</figure>
			{/if}

			{#if mainVideo?.url}
				<figure class="relative w-1/4 md:w-1/5 rounded-md overflow-hidden ">
					<div class="relative w-full pb-[100%] ">
						<img
							class="main-image"
							alt={mainVideo.alt}
							src={`https://img.youtube.com/vi/${getYoutubeId(mainVideo.url)}/hqdefault.jpg`}
						/>
					</div>
				</figure>
			{/if}
		</div>
	</header>

	<section class="relative w-full flex flex-col items-start">
		<small class="absolute top-0 right-0 text-xs font-bold tracking-wider text-primary-less">
			{#if timestampModified}
				<time datetime={timestampModified}
					>updated {dateToTimeSince(new Date(timestampModified))}</time
				>
			{:else}
				<time datetime={timestamp}>{dateToTimeSince(new Date(timestamp))}</time>
			{/if}
		</small>

		<!-- REF: https://www.digitalocean.com/community/tutorials/css-collapsible -->
		<input
			id={`${id}_expand`}
			type="checkbox"
			class="expand-input"
			bind:checked={isExpanded}
			on:click={() => {
				$currentStoryIdStore = id;
			}}
		/>
		<label htmlfor={`${id}_expand`} class="expand-label" tabindex="0"
			>{isExpanded ? 'close' : 'more'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="0.8rem"
				height="0.8rem"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M21,11.109L21,11.109c0-1.329-1.481-2.122-2.587-1.385L12,14L5.587,9.725C4.481,8.988,3,9.78,3,11.109v0 c0,0.556,0.278,1.076,0.741,1.385l7.15,4.766c0.672,0.448,1.547,0.448,2.219,0l7.15-4.766C20.722,12.185,21,11.666,21,11.109z"
				/></svg
			>
		</label>

		<div class="drawer">
			<div class="flex flex-col pt-8 gap-8 w-full">
				<slot />
			</div>
		</div>
	</section>
</article>

<style>
	.preview {
		@apply w-full rounded-2xl flex flex-col gap-5 border-2 border-solid border-background-less p-5 max-w-[500px];
	}
	.preview:hover {
		@apply border-primary;
	}
	.preview.selected {
		@apply border-primary -translate-x-[2px] -translate-y-[2px] shadow-[4px_4px_0_0_rgba(0,0,0,1)];
	}
	.preview.breaking.selected {
		@apply shadow-[4px_4px_0_0_rgba(255,218,163,1)];
	}

	.section__header {
		@apply w-full flex flex-col gap-6;
	}

	.header-row {
		@apply w-full flex flex-row justify-between gap-4;
	}

	.title-container.no-image {
		@apply grid-cols-[1fr];
	}

	.main-image-figure {
		@apply relative w-full max-w-full pb-[100%] rounded-md overflow-hidden;
	}
	.main-image-container {
		@apply absolute top-0 right-0 bottom-0 left-0 w-full h-full;
	}
	.main-image {
		@apply absolute top-0 right-0 bottom-0 left-0 w-full h-full min-w-full min-h-full object-cover object-center;
	}

	.quote {
		@apply w-full pl-4 py-[0.5em] flex flex-col gap-4 border-l-2 border-solid border-background-lesser text-lg leading-snug;
	}
	.quote footer {
		@apply text-sm font-normal;
	}

	.drawer {
		@apply w-full max-h-0 overflow-hidden transition-[max-height] duration-300;
	}

	.expand-label {
		@apply text-sm text-primary-less font-bold tracking-wider cursor-pointer pointer-events-none flex flex-row;
	}
	.expand-label svg {
		@apply block mt-[0.2rem] ml-[0.2rem] transition-transform duration-200;
	}
	.expand-input:hover + .expand-label {
		@apply text-accent1;
	}
	.expand-input {
		@apply opacity-0 absolute top-0 left-0 w-full h-8 cursor-pointer;
	}

	.expand-input:checked + .expand-label + .drawer {
		@apply max-h-[1000px];
	}
	.expand-input:checked + .expand-label svg {
		@apply mt-[0.25rem] rotate-180;
	}
</style>
