<script lang="ts">
	import YoutubePlayer from '$components/elements/youtube-player.svelte';
	import type { YoutubeEmbed } from '$lib/cms/models/youtube-embed';
	import getYoutubeId from 'get-youtube-id';

	const youtubeData: YoutubeEmbed = $$props.portableText.block;
	const youtubeId = getYoutubeId(youtubeData.url);
</script>

<YoutubePlayer id={youtubeId} />
