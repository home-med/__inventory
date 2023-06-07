<script lang="ts">
	import { createEventDispatcher } from "svelte";
	export let name:string;

	export let id: string = `ti-${Math.random().toString(36)}`;
	export let value: string = "";
	export let helperText: string = "";
	export let labelText: string = "";
	export let invalidText: string = "";
	export let warnText: string = "";

	export let disabled: boolean = false;
	export let invalid: boolean = false;
	export let warn: boolean = false;
	export let required: boolean = false;
	export let readonly: boolean = false;

	export let ref: HTMLInputElement | null = null;

	const dispatch = createEventDispatcher();

	function parse(raw: FormDataEntryValue) {
		if ($$restProps.type !== "number") return raw;
		return raw != "" ? Number(raw) : null;
	}

	const onInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		dispatch("input", parse(target.value));
	};

	const onChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		dispatch("change", parse(target.value));
	};

	$: error = invalid && !readonly;
	$: helperId = `helper-${id}`;
	$: errorId = `error-${id}`;
	$: warnId = `warn-${id}`;
</script>

<div
	class="form-group-control"
	on:keyup
	on:focus
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	>
	
	<input
		bind:this={ref}
		data-invalid={error || undefined}
		aria-invalid={error || undefined}
		data-warn={warn || undefined}
		aria-describedby={error ? errorId : warn ? warnId : helperText ? helperId : undefined}
		{disabled}
		{id}
		{name}
		placeholder=""
		bind:value
		{required}
		{readonly}
		{...$$restProps}
		on:change={onChange}
		on:input={onInput}
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:paste
	/>

	<label for={id}>
		<slot name="labelText">
			{labelText}
		</slot>
	</label>
</div>
<div id="{helperId}">{helperText}</div>
{#if invalid}
	<div id="{errorId}">{invalidText}</div>
{/if}
{#if !invalid && warn}
	<div id="{warnId}">{warnText}</div>
{/if}
<style>
</style>
