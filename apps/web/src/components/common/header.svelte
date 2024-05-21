<script lang="ts">
	import NavigationIcon from '$components/icons/navigation-icon.svelte';
	import type { NormalizedBanner } from '$lib/cms/models/banner';

	import type { Nullable } from '$lib/utils/nullable';
	import Banner from './banner.svelte';

	import BottomNav from './bottom-nav.svelte';

	export let banner: Nullable<NormalizedBanner>;

	/* const toolItems = [
		{
			label: 'menu',
			action: () => {
				window.alert('Menu!');
			}
		}
		{
			label: 'theme',
			action: () => {
				window.alert('theme!');
			}
		}
	]; */
	const navItems = [
		{
			label: 'newsletter',
			href: '/newsletter'
		},
		{
			label: 'podcast',
			href: '/podcast'
		},
		{
			label: 'support us',
			href: '/support-us'
		}
	];
</script>

{#if banner}
	<Banner {banner} />
{/if}
<!-- TODO: Reduce height on mobile -->
<header
	class="h-12 md:h-header px-content sticky top-0 right-0 left-0 bg-background z-headerPrimary header-border"
>
	<div
		id="header-logo-container"
		class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center -z-1"
	>
		<a
			href="/"
			class="text-xs font-bold uppercase leading-none flex flex-col gap-[0.5em] justify-center items-center"
		>
			<picture>
				<source srcset="/shn-logo-main.svg" media="(min-width: 768px)" />
				<img alt="smarther news logo" src="/shn-logo-monogram.svg" class="h-6" />
			</picture>
			<h1 class="sr-only  leading-none md:not-sr-only">Quick. Concise. Nonpartisan.</h1>
		</a>
	</div>

	<div
		id="toolbar"
		class="hidden w-full p-4 flex-row justify-between items-center bg-background md:flex"
	>
		<button type="button" on:click={() => window.alert('Menu!')}
			><NavigationIcon name="hamburger" width="2rem" height="2rem" /></button
		>

		<nav class="flex flex-row gap-4 z-10">
			{#each navItems as { label, href }, _ (label)}
				<a {href}>{label}</a>
			{/each}
		</nav>
	</div>

	<BottomNav />
</header>

<style>
	.header-border {
		@apply border-b-2 border-solid border-primary;
	}
</style>
