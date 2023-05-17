<script lang="ts">
	import { uuid } from '$lib/utils';

	type button = "button" | "submit" | "reset"

	export let id: string = uuid();
	export let type: button = "button";
	export let loading: boolean;
</script>

	<button {id} {type} disabled={loading || null} aria-busy={loading || null} class:secondary={loading}>
		{#if !loading}<slot />{/if}
	</button>

<style>
  [aria-busy] {
    opacity: 0.25;
    cursor: not-allowed;
  }
</style>
