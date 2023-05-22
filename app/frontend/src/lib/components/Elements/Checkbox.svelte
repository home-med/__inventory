<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name: string;
	export let id: string = 'checkbox' + Math.random().toString(36);
	export let label: string = '';
	export let value: string = '';
	export let title: string = '';
	export let group: string[] = [];
	export let indeterminate: boolean = false;
	export let checked: boolean = false;
	export let required: boolean = false;
	export let readonly: boolean = false;
	export let disabled: boolean = false;
	export let ref: HTMLInputElement | null = null;
	export let refLabel: HTMLSpanElement | null = null;

	const dispatch = createEventDispatcher();

	$: useGroup = Array.isArray(group);
	$: checked = useGroup ? group.includes(value) : checked;
</script>

<div class="form-control-group">
	<input
		bind:this={ref}
		bind:value
		type="checkbox"
		{id}
		{name}
		{disabled}
		{readonly}
		{required}
		{indeterminate}
		aria-required={required || null}
		aria-disabled={disabled || null}
		aria-readonly={readonly || null}
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:paste
	/>

	<label for={id} {title}>
		<span bind:this={refLabel}>
			<slot name="labelText">
				{label}
			</slot>
		</span>
	</label>
</div>

<style>
	.form-control-group {
		flex-flow: row nowrap;
	}
	label {
		position: relative;
	}
	input[type='checkbox'] {
		margin: var(--form-element-spacing-vertical) var(--form-element-spacing-horizontal);
	}
</style>
