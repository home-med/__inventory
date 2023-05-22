<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name: string;
	export let id: string = 'textInput-' + Math.random().toString(36);
	export let label: string = '';
	export let value: string = '';
	export let title: string = '';
	export let indeterminate: boolean = false;
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let help_text: string = '';

	export let ref: HTMLInputElement | null = null;
	export let refLabel: HTMLSpanElement | null = null;

	const dispatch = createEventDispatcher();

	function parse(raw: any) {
    if ($$restProps.type !== "number") return raw;
    return raw != "" ? Number(raw) : null;
  }

	const onInput = (e:Event) => {
		const target = e.target as HTMLInputElement
		dispatch('input', parse(target.value));
	};

	const onChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		dispatch('change', parse(target.value));
	};
</script>

<div class="form-control-group">
	<input
		type="text"
		bind:this={ref}
		bind:value
		{id}
		{name}
		{disabled}
		{readonly}
		{indeterminate}
		required={required || null}
		aria-required={required || null}
		aria-disabled={disabled || null}
		aria-readonly={readonly || null}
		on:change
		on:blur
	/>
	<label for={id} {title}>
		<span bind:this={refLabel}>
			<slot name="labelText">
				{label}
			</slot>
		</span>
	</label>
	<small>{help_text}</small>
</div>

<style>
	input {
		margin-bottom: 0;
	}
</style>
