<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name: string;
	export let id: string = 'cb' + Math.random().toString(36);
	export let labelText: string = '';
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

	const onChange = () => {
		if (useGroup) {
			group = group.includes(value)
				? group.filter((val) => val !== value)
				: [...group, value];
		} else {
			checked = !checked;
		}
	};

	$: useGroup = Array.isArray(group);
	$: checked = useGroup ? group.includes(value) : checked;
</script>

<div class="form-control-group">
	<input
		bind:this={ref}
		type="checkbox"
		{id}
		{name}
		{disabled}
		{readonly}
		{required}
		{indeterminate}
		{value}
		aria-required={required || null}
		aria-disabled={disabled || null}
		aria-readonly={readonly || null}
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:paste
		on:change={onChange}
		on:change
	/>

	<label for={id} {title}>
		<span bind:this={refLabel}>
			<slot name="labelText">
				{labelText}
			</slot>
		</span>
	</label>
</div>

<style>
</style>
