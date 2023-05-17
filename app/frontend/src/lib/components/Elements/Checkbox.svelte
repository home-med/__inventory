<script lang="ts">
	import { uuid } from '$lib/utils';

	export let name: string;
	export let id: string = '';
	export let label: string = '';
	export let value: string = '';
	export let checked: boolean = false;
	export let required: boolean = false;
	export let disabled: boolean = false;

	$: if (id === '') id = uuid();
</script>

<div class="form-control-group">
	<input
		type="checkbox"
		{id}
		{name}
		bind:value
		required={required || null}
		aria-required={required || null}
		{disabled}
		aria-disabled={disabled || null}
		bind:checked
	/>
	<span>{label}</span>
</div>

<style>
  .form-control-group {
    flex-flow: row nowrap
  }
  span {
    position: relative;
  }
  input[type="checkbox"] {
    margin: var(--form-element-spacing-vertical) var(--form-element-spacing-horizontal);
  }
</style>
