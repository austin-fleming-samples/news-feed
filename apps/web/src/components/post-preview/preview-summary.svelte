<script lang="ts">
	import type { ExpandedSummaryBlockContent } from '$lib/cms/models/summary-block-content';
	import PortableText from '@portabletext/svelte';

	export let summary: ExpandedSummaryBlockContent;
</script>

<div class="w-full prose prose-ul:pl-[0.87rem] leading-snug">
	<PortableText blocks={summary} />
</div>
