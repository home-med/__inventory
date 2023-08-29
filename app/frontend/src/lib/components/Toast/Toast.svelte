<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { SuccessIcon, ErrorIcon, InfoIcon, CloseIcon, LoadingIcon, WarningIcon, DangerIcon } from '../Icons';

	const dispatch = createEventDispatcher();

	export let type = 'error';
	export let dismissable = false;
	$: toastProps = {
		role: 'alert',
		class: [
			'relative',
			'flex',
			'flex-row',
			'items-center',
			'p-3',
			'border-r-3',
			'gap-4',
			'mx-auto',
			'mt-0',
			'mb-2',
			'w-[40rem]',
			'h-28',
			'border-l-2',
			'border-solid',
			'rounded',
			'shadow-md',
			type === 'primary' && 'bg-blue-100',
			type === 'primary' && 'text-blue-700',
			type === 'primary' && 'border-blue-700',
			type === 'info' && 'bg-indigo-100',
			type === 'info' && 'text-indigo-700',
			type === 'info' && 'border-indigo-700',
			type === 'success' && 'bg-green-100',
			type === 'success' && 'text-green-700',
			type === 'success' && 'border-green-700',
			type === 'warning' && 'bg-yellow-100',
			type === 'warning' && 'text-yellow-700',
			type === 'warning' && 'border-yellow-700',
			type === 'error' && 'bg-red-100',
			type === 'error' && 'text-red-700',
			type === 'error' && 'border-red-700',
		]
			.filter(Boolean)
			.join(' ')
	};
</script>

<article {...toastProps} transition:fade >
	<div class="flex-initial">
		{#if type === 'success'}
		<SuccessIcon />
		{:else if type === 'error'}
		<ErrorIcon />
		{:else if type === 'info'}
		<InfoIcon />
		{:else if type === 'loading'}
		<LoadingIcon />
		{:else if type === 'warning'}
		<WarningIcon />
		{:else if type === 'danger'}
		<DangerIcon />
		{/if}
		</div>
		<div class="self-start">
		{#if dismissable}
		<button class="absolute top-4 right-4 p-0 m-0 w-4 text-white bg-transparent border-0 cursor-pointer" on:click={() => dispatch('dismiss')}>
			<CloseIcon  />
		</button>
		{/if}
		<section class="flex-grow">
			<slot />
		</section>
		</div>
</article>

<style lang="postcss">

	button {
		color: white;
		background: transparent;
		border: 0 none;
		padding: 0;
		margin: 0 0 0 auto;
		line-height: 1;
		font-size: 1rem;
		cursor: pointer;
	}
</style>
