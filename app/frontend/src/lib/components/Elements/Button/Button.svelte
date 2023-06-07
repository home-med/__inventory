<script lang="ts">

	type button = 'button' | 'submit' | 'reset';

	export let id: string = 'btn-' + Math.random().toString(36);
	export let type: button = 'button';
	export let loading: boolean;
	export let disabled: boolean = false;

	export let ref: HTMLButtonElement | null = null;

	$: buttonProps = {
		id,
		type: !disabled || loading ? undefined : type,
		disabled: disabled === true ? true : undefined,
		"aria-disabled": loading === true || null,
		"aria-busy": loading === true || null,
		...$$restProps,
		class: [
			loading && "secondary",
			$$restProps.class,
		]
		.filter(Boolean)
		.join(" ")
	};
</script>

<button
	bind:this={ref}
	{...buttonProps}
	on:focus
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
>
	{#if !loading}<slot />{/if}
</button>

<style>
	[aria-busy] {
		opacity: 0.25;
		cursor: not-allowed;
	}
</style>
