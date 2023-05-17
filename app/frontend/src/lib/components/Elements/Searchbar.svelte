<script lang="ts">
	import type { TProduct } from '$lib/types';
	import { debounce, uuid } from '$lib/utils';

	export let name: string;
	export let label: string = '';
	export let value: string = '';
	export let help_text: string = '';

  let results: TProduct[] = [];

	$: id = uuid();

  const getResults = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const val = target.value;
    results = debounce(() => {
      fetch('http://127.0.0.1:8090/api/categories/products/')
    })
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
