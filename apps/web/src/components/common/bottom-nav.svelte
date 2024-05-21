<script lang="ts">
	import NavigationIcon from '$components/icons/navigation-icon.svelte';
	import { onMount } from 'svelte';
	import type { NavigationIconName } from '$components/icons/navigation-icon.svelte';
	import { page } from '$app/stores';

	const navItems: Array<{ label: string; href: string; iconName: NavigationIconName }> = [
		{
			label: 'home',
			href: '/',
			iconName: 'home'
		},
		{
			label: 'stories',
			href: '/stories',
			iconName: 'stories'
		},
		{
			label: 'podcasts',
			href: '/podcast',
			iconName: 'podcasts'
		},
		{
			label: 'newsletters',
			href: '/newsletter',
			iconName: 'newsletters'
		}
	];

	/* Hide on scroll */
	const scrollDuration = 300;
	const scrollOffset = 80;
	const scrollTolerance = 10;

	let scrollY = 0;
	let lastScrollY = 0;

	const scrollboxActiveClass = 'pinned';
	const scrollboxInactiveClass = 'unpinned';

	let currentScrollboxClass: 'pinned' | 'unpinned' = scrollboxActiveClass;

	const setTransitionDuration = (node: HTMLElement) => {
		node.style.transitionDuration = `${scrollDuration}ms`;
	};

	const updateScrollboxClass = (y = 0): 'pinned' | 'unpinned' => {
		const distanceScrolled = lastScrollY - y;
		lastScrollY = y;

		if (y < scrollOffset) return scrollboxActiveClass;

		if (Math.abs(distanceScrolled) <= scrollTolerance) return currentScrollboxClass;

		if (distanceScrolled > 0) return scrollboxActiveClass;

		return scrollboxInactiveClass;
	};

	$: currentScrollboxClass = updateScrollboxClass(scrollY);

	onMount(() => {
		// NOTE: Prevents navbar "jump" when reloading page, and that the bar is always visible on page load.
		lastScrollY = scrollY;
	});
</script>

<svelte:window bind:scrollY />

<button
	aria-label="show menu"
	type="button"
	on:click={() => (currentScrollboxClass = 'pinned')}
	use:setTransitionDuration
	class="fixed right-4 bottom-4 text-sm font-bold tracking-wider px-[2em] py-[0.5em] bg-background-less rounded-lg translate-y-0 md:hidden"
	class:translate-y-20={currentScrollboxClass === 'pinned'}>Menu</button
>

<div
	id="bottom-nav"
	use:setTransitionDuration
	class="fixed right-0 bottom-0 left-0 w-full px-sitepad py-2 flex flex-row justify-between items-center border-t-2 border-solid border-primary bg-background md:hidden {currentScrollboxClass}"
>
	<nav class="flex flex-row gap-4 z-10 w-full justify-center">
		{#each navItems as { label, href, iconName }, _ (label)}
			<a
				{href}
				aria-current={$page.url.pathname === href}
				class="nav-item"
				class:current={$page.url.pathname === href}
			>
				<NavigationIcon name={iconName} width="1.5rem" height="1.5rem" />
				<span>{label}</span>
			</a>
		{/each}

		<button
			class="nav-item"
			type="button"
			on:click={() => {
				window.alert('Menu!');
			}}
		>
			<NavigationIcon name="hamburger" width="1.5rem" height="1.5rem" />
			<span>menu</span>
		</button>
	</nav>
</div>

<style>
	.pinned {
		@apply translate-y-[0%];
	}
	.unpinned {
		@apply translate-y-[100%];
	}

	.nav-item {
		@apply w-full max-w-[4rem] flex flex-col items-center gap-[0.25em] text-xs text-primary-lesser pb-[0.5em];
	}
	.nav-item:hover,
	.nav-item:focus,
	.nav-item:target,
	.nav-item.current {
		@apply text-accent1;
	}
</style>
