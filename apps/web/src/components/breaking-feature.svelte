<script lang="ts">
	import type { ExpandedSummaryBlockContent } from '$lib/cms/models/summary-block-content';

	import type { Nullable } from '$lib/utils/nullable';
	import PortableText from '@portabletext/svelte';

	export let title: string;
	export let summary: Nullable<ExpandedSummaryBlockContent>;
	export let timestamp: string;
	export let href: string;
</script>

<a {href} class="w-full block px-sitepad">
	<article
		class="w-full max-w-container py-8 mx-auto border-b-2 border-solid border-primary-less text-center flex flex-col gap-4 items-center"
	>
		<span
			class="text-xs tracking-wider font-bold leading-none py-[0.75em] px-[1.5em] uppercase bg-[#FFDAA3] text-primary-less rounded"
			>Breaking</span
		>
		<h1 class="text-2xl md:text-5xl font-bold w-full mx-auto">
			{title}
		</h1>

		{#if summary}
			<div class="w-full max-w-container-narrow mx-auto prose prose-sm leading-snug">
				<PortableText blocks={summary} />
			</div>
		{/if}

		<time class="text-xs" datetime={timestamp}
			>{new Date(timestamp).toLocaleDateString()} {new Date(timestamp).toLocaleTimeString()}</time
		>
	</article>
</a>
