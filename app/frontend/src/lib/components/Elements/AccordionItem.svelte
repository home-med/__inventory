<script lang="ts">
	import { ChevronIcon } from '../Icons';
	export let open: boolean = false;
	export let label: string = 'Accordian Item 1';
</script>

<details class="flex" bind:open>
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
	}
</style>
