<script lang="ts">
	import type { ExpandedArticleBlockContent } from '$lib/cms/models/article-block-content';

	import PortableText from '@portabletext/svelte';
	import Figure from './article-body-components/figure.svelte';
	import Heading1 from './article-body-components/heading-1.svelte';
	import Heading2 from './article-body-components/heading-2.svelte';
	import Heading3 from './article-body-components/heading-3.svelte';
	import Heading4 from './article-body-components/heading-4.svelte';
	import Link from './article-body-components/link.svelte';
	import YoutubeEmbed from './article-body-components/youtube-embed.svelte';

	export let blocks: ExpandedArticleBlockContent;
</script>

<div class="prose">
	<PortableText
		{blocks}
		serializers={{
			blockStyles: {
				h1mock: Heading1,
				h2mock: Heading2,
				h3mock: Heading3,
				h4mock: Heading4
			},
			types: {
				complexImage: Figure,
				youtubeEmbed: YoutubeEmbed
			},
			marks: {
				link: Link
			}
		}}
	/>
</div>
