<script lang="ts">
	import { onMount } from 'svelte';

	// TODO: currently, every time this component is used, the consuming component has to extract the video id from the url provided from the cms. This should be centralized.
	export let id: string;

	let isMounted = false;
	let Player;
	let Youtube;

	/* 
	TODO: having to dynamically import is going to hurt progressive enhancement and content shift.
	Maybe hot-swap youtube thumbnails and a link to youtube to watch if js is disabled?
	*/
	// REF: https://github.com/vime-js/vime/issues/168
	onMount(async () => {
		const Vime = await import('@vime/svelte');

		Player = Vime.Player;
		Youtube = Vime.Youtube;
		isMounted = true;
	});
</script>

{#if isMounted}
	<Player controls>
		<Youtube videoId={id} />
	</Player>
{/if}
