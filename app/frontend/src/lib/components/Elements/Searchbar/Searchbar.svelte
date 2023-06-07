<script lang="ts">
	import type { TProduct } from '$lib/types';

	export let name: string;
	export let id: string = 'sb-'+Math.random().toString(36);
	export let label: string = '';
	export let value: string = '';
	export let help_text: string = '';

  let results: TProduct[] = [];


  const getResults = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const val = target.value;
  }

</script>

<div class="form-control-group">
	<input
		type="text"
		{id}
		{name}
		bind:value
    on:change={getResults}
	/>
	<span>{label}</span>
	<small>{help_text}</small>
  <ul>
    {#each results as result}
    <li></li>
    {/each}
  </ul>
</div>

<style>
	input {
		margin-bottom: 0;
	}
</style>
