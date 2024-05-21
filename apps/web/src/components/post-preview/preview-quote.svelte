<script lang="ts">
	export let quote: string;
	export let citation: string;
</script>

<blockquote class="root">
	<p>“{quote}”</p>
	<footer class="citation">
		<p>{citation}</p>
	</footer>
</blockquote>

<style>
	.root {
		@apply relative w-full pl-4 py-[0.5em] flex flex-col gap-4 text-lg font-semibold leading-snug;
	}
	.root:after {
		content: '';
		@apply absolute top-0 bottom-0 left-0 w-[3px] bg-background-lesser rounded-full;
	}
	.citation {
		@apply text-base font-normal;
	}
</style>
