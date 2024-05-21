<script lang="ts">
	import type { NormalizedBanner } from '$lib/cms/models/banner';
	export let banner: NormalizedBanner;

	let showBanner = true;
</script>

<aside aria-label="banner" class="root" class:hidden={!showBanner} aria-hidden={!showBanner}>
	<div class="wrapper">
		<a href={banner.banner.link.path} class="link">
			<span class="badge">{banner.banner.chip}</span>
			<div class="description">
				<p>
					{banner.banner.content}
				</p>
			</div>
		</a>

		<!-- TODO: use local storage for toggle -->
		<button type="button" aria-label="close banner" on:click={() => (showBanner = false)}>X</button>
	</div>
</aside>

<style>
	.root {
		@apply relative w-full px-sitepad py-4 z-headerPrimary bg-primary text-background;
	}

	.wrapper {
		@apply w-full max-w-container mx-auto flex flex-row gap-4 justify-between items-start;
	}

	.link {
		@apply flex flex-row gap-4 justify-start items-start;
	}

	.badge {
		@apply text-xs font-bold leading-none py-[0.5em] px-[1em] bg-primary-less text-background rounded md:whitespace-nowrap;
	}

	.description {
		@apply text-sm pt-[0.2em];
	}
</style>
