<script>
  import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { SuccessIcon } from '../Icons';
	import { ErrorIcon } from '../Icons';
	import { InfoIcon } from '../Icons';
	import { CloseIcon } from '../Icons';
  import { LoadingIcon } from '../Icons';

  const dispatch = createEventDispatcher();

	export let type = 'error';
	export let dismissable = true;
</script>

<article class={type} role="alert" transition:fade>
	{#if type === "success"}
		<SuccessIcon />
	{:else if type === "error"}
		<ErrorIcon />
	{:else if type === "info"}
		<InfoIcon />
  {:else if type === "loading"}
    <LoadingIcon />
	{/if}

	<div class="text">
		<slot />
	</div>

	{#if dismissable}
		<button class="close" on:click={() => dispatch('dismiss')}>
			<CloseIcon width="0.8em" />
		</button>
	{/if}
</article>

<style lang="postcss">
	article {
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.2rem;
		display: flex;
		align-items: center;
		margin: 0 auto 0.5rem auto;
		width: 20rem;
	}
	.error {
		background: IndianRed;
	}
	.success {
		background: MediumSeaGreen;
	}
	.info {
		background: SkyBlue;
	}
	.loading {
		background: SandyBrown;
	}
	.text {
		margin-left: 1rem;
	}
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
