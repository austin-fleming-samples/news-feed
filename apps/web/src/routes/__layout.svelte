<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const banner = await fetch('/api/banner.json').then(
			(response) => response.json() as Promise<Nullable<NormalizedBanner>>
		);

		return {
			props: {
				banner
			}
		};
	};
</script>

<script lang="ts">
	import '../app.css';
	import Header from '$components/common/header.svelte';
	import '$styles/app.css';
	import type { NormalizedBanner } from '$lib/cms/models/banner';
	import type { Nullable } from '$lib/utils/nullable';

	export let banner: Nullable<NormalizedBanner>;
</script>

<main class="w-full">
	<Header {banner} />
	<slot />
</main>
