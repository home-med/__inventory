<script lang="ts">
	import { uuid } from '$lib/utils';

	export let id: string = '';
	export let name: string;
	export let label: string;
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = true;
	export let disabled: boolean = false;
	export let help_text: string = '';

	$: if (id === '') id = uuid();
</script>

<div class="form-control-group">
	<textarea
		{id}
		{name}
		{placeholder}
		bind:value
		{required}
		aria-required={required || null}
		{disabled}
		aria-disabled={disabled || null}
	/>

	<span>{label}</span>
	<small>{help_text}</small>
</div>

<style>
	small {
		font-size: 0.3rem;
	}
</style>
