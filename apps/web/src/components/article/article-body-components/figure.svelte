<script lang="ts">
	import type { ExpandedComplexImage } from '$lib/cms/models/complex-image';

	const imageData: ExpandedComplexImage = $$props.portableText.block;
</script>

<figure class="max-w-full w-full">
	<img class="p-0 m-0" src={imageData.asset.url} alt={imageData.alt} />

	{#if imageData.attribution || imageData.caption}
		<figcaption class="mt-2 flex flex-col">
			{#if imageData.attribution}
				<small>{imageData.attribution}</small>
			{/if}
			{#if imageData.caption}
				<p class="p-0 m-0">{imageData.caption}</p>
			{/if}
		</figcaption>
	{/if}
</figure>
