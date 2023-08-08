<script lang="ts">
	type ButtonType = "button" | "reset" | "submit" | undefined | null;
	export let type: ButtonType = 'button';
	export let tabindex = 0;
	export let kind: string = 'primary';
	export let ref: HTMLButtonElement | null = null;

	let classList = $$restProps.class;
	delete $$restProps.class

	$: buttonProps = {
		type,
		tabindex,
		class: [
			'font-bold',
			'text-lg',
			'tracking-wider',
			'transition',
			'duration-300',
			'ease-in-out',
			'delay-150',
			'round',
			'hover:-translate-y-1',
			'hover:scale-110',
			'rounded',
			kind === 'primary' && 'bg-blue-500',
			kind === 'primary' && 'hover:bg-indigo-500',
      kind === 'primary' && 'text-white',
			kind === 'secondary' && 'bg-neutral-500',
			kind === 'secondary' && 'hover:bg-neutral-300',
			kind === 'danger' && 'bg-red-500',
			kind === 'danger' && 'hover:bg-rose-500',
			classList
		]
			.filter(Boolean)
			.join(' ')
	};

</script>

<button {...buttonProps} {...$$restProps} bind:this={ref} on:click on:mouseover on:mouseenter on:mouseleave on:focus>
	<slot />
</button>
