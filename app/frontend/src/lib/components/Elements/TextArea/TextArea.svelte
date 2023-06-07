<script lang="ts">
	
	import { createEventDispatcher } from "svelte";

	export let name: string;
	export let labelText: string;
	export let id: string = 'ta-' + Math.random().toString(36);
	export let value: string = '';
	export let title: string = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let helpText: string = '';
	export let ref: HTMLTextAreaElement | null = null;
	export let refLabel: HTMLSpanElement | null = null;
</script>

<div class="form-control-group">
	<textarea
		bind:this="{ref}"
		bind:value
		{id}
		{name}
		{disabled}
		{readonly}
		{required}
		placeholder=""
		aria-required={required || null}
		aria-disabled={disabled || null}
		aria-readonly={readonly || null}
		{...$$restProps}
		on:change
		on:input
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:paste
	></textarea>

	<label for={id} {title}>
		<span bind:this={refLabel}>
			<slot name="labelText">
				{labelText}
			</slot>
		</span>
	</label>
	<small>{helpText}</small>
</div>

<style>
</style>
