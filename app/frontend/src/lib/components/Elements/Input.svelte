<script lang="ts">
	import { uuid } from '$lib/utils';

	export let name: string;
	export let id: string = '';
	export let label: string = '';
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let help_text: string = '';

	$: if (id === '') id = uuid();
</script>

<div class="form-control-group">
	<input
		type="text"
		{id}
		{name}
		bind:value
		{placeholder}
		required={required || null}
		aria-required={required || null}
		{disabled}
		aria-disabled={disabled || null}
	/>
	<span>{label}</span>
	<small>{help_text}</small>
</div>

<style>
	input {
		margin-bottom: 0;
	}
</style>
