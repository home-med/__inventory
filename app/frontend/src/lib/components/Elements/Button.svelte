<script lang="ts">
	type ButtonType = "button" | "reset" | "submit" | undefined | null;
	export let type: ButtonType = 'button';
	export let tabindex = 0;
	export let kind: string = 'primary';
	export let ref: HTMLButtonElement | null = null;

	$: buttonProps = {
		type,
		tabindex,
		class: [
			'flex',
			'justify-center',
			'tracking-wider',
			'transition',
			'duration-300',
			'ease-in-out',
			'delay-150',
			'rounded',
			'hover:-translate-y-1',
			'hover:scale-110',
			'px-6',
			'py-1',
			'text-white',
			kind === 'primary' && 'bg-blue-500',
			kind === 'primary' && 'hover:bg-blue-700',
			kind === 'success' && 'bg-green-500',
			kind === 'success' && 'hover:bg-green-700',
			kind === 'info' && 'bg-blue-500',
			kind === 'info' && 'hover:bg-blue-700',
			kind === 'secondary' && 'bg-gray-500',
			kind === 'secondary' && 'hover:bg-gray-700',
			kind === 'warning' && 'bg-yellow-500',
			kind === 'warning' && 'hover:bg-yellow-700',
			kind === 'danger' && 'bg-red-500',
			kind === 'danger' && 'hover:bg-red-700',
			$$restProps.class,
		]
			.filter(Boolean)
			.join(' ')
	};

</script>
<button {...buttonProps} bind:this={ref} on:click on:mouseover on:mouseenter on:mouseleave on:focus>
	<slot />
</button>
