<script lang="ts">
	import { ChevronIcon } from '$lib/components/Icons';
	import { getContext } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	export let open: boolean = false;
	export let label: string = 'Accordian Item 1';
	const ctx = getContext("Accordion");
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<details
	class="flex"
	on:click
	on:click={() => {
		open = !!open;
	}}
	bind:open
>
	<summary class="inline-flex">
		{label}
		<span
			class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none"
		>
			<ChevronIcon />
		</span>
	</summary>
	<slot />
</details>

<style>
	summary {
		list-style: none;
		cursor: pointer;
	}
</style>
