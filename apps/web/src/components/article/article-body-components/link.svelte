<script lang="ts">
	import type { ExpandedLink } from '$lib/cms/models/link';

	import type { MarkProps } from '@portabletext/svelte';

	export let portableText: MarkProps<ExpandedLink>;

	const mark = portableText.mark;

	type LinkConfig = {
		type: ExpandedLink['linkType'];
		to: string;
		openNewTab: boolean;
		rel?: string;
	};

	let config: LinkConfig;

	if (mark.linkType === 'internal') {
		config = {
			type: 'internal',
			to: mark.path,
			openNewTab: false
		};
	}

	if (mark.linkType === 'external') {
		// TODO: needs rel config
		config = {
			type: 'external',
			to: mark.linkExternal.href,
			openNewTab: true
		};
	}

	if (mark.linkType === 'internalReference') {
		// TODO: need fully expanded type
		// TODO: slug needs to be built at single source of truth
		config = {
			type: 'internalReference',
			to: `/articles/${mark.internalReference.slug.current}`,
			openNewTab: false
		};
	}

	console.log(config);
</script>

<a href={config.to} target={config.openNewTab ? '_blank' : '_self'}><slot /></a>
