<script lang="ts">
	import type { Option } from '$lib/types';

	export let id: string = "select-" + Math.random().toString(36);
	export let name: string;
	export let title: string = '';
	export let value: string = '';
	export let label: string = '';
	export let options: Option[] = [{
			text: 'No values',
			value: ''
		}];
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let help_text = '';
	export let ref: HTMLSelectElement | null = null;
	export let refLabel: HTMLSpanElement | null = null;

</script>

<div class="form-control-group">
	<select
		bind:this="{ref}"
		bind:value
		{id}
		{name}
		{required}
		{disabled}
		aria-required={required || null}
		aria-disabled={disabled || null}
		data-value={value}
		on:change
		on:blur
	>
		<option value="" selected />
		{#each options as option}
			<option value={option.value}>{option.text}</option>
		{/each}
	</select>
	<label for={id} {title}>
		<span bind:this={refLabel}>
			<slot name="labelText">
				{label}
			</slot>
		</span>
	</label>
	<small>{help_text} {value}</small>
</div>

<style>
</style>
