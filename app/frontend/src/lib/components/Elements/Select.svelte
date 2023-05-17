<script lang="ts">
	import type { Option } from '$lib/types';
	import { uuid } from '$lib/utils';

	export let id: string = '';
	export let name: string;
	export let value: string = '';
	export let label = '';
	export let options: Option[] = [{
			text: 'No values',
			value: ''
		}];
	export let required = false;
	export let disabled = false;
	export let help_text = '';

	$: if (id === '') id = uuid();
</script>

<div class="form-control-group">
	<select
		{id}
		{name}
		{required}
		aria-required={required || null}
		{disabled}
		aria-disabled={disabled || null}
		data-value={value}
		bind:value
	>
		<option value="" selected />
		{#each options as option}
			<option value={option.value}>{option.text}</option>
		{/each}
	</select>
	<span>{label}</span>
	<small>{help_text} {value}</small>
</div>

<style>
</style>
