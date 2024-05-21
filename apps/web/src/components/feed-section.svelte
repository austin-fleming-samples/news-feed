<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<section class="w-full mx-auto p-sitepad pb-24 pt-12">
	<div class="max-w-container-narrow mx-auto">
		<h1 class="font-bold text-2xl md:text-3xl">{title}</h1>
		<h2 class="text-sm">{description}</h2>
	</div>

	<div class="w-full flex flex-col gap-4 mt-8 max-w-container-narrow mx-auto">
		<slot />
	</div>
</section>
