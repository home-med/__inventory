<script lang="ts">
	import { generateID } from '$lib/utils';

	export let id: string = generateID();
	export let label: string = 'InputLabel';
	export let labelClass: string = '';
	export let type: string = 'text';
	export let tabindex = 0;
	export let placeholder: string = '';
	export let name: string = '';

	const defaultLabelClass = 'py-4 w-32 border border-gray-400'.split(' ');

	const defaultClass = 'px-4 py-2 w-full outline-none focus:border-gray-400'.split(' ');
	$: inputProps = {
		id,
		type,
		tabindex,
		placeholder,
		name,
		class: [...defaultClass, ...($$props.class?.split(' ') ?? [])].filter(Boolean).join(' '),
	};

	$: labelProps = {
		id: generateID(),
		"for": id,
		class: [...defaultLabelClass, ...(labelClass?.split(' ') ?? [])].filter(Boolean).join(' '),
	}
</script>

<div class="flex flex-row rounded-md shadow-sm">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label {...labelProps}>
		{label}
	</label>
		{#if $$slots.prepend}
			<span
				class="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 rounded-l-md border border-r-0 border-gray-300"
			>
				<slot name="prepend" />
			</span>
		{/if}
		<input {...inputProps} />
		{#if $$slots.append}
			<span
				class="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 rounded-l-md border border-l-0 border-gray-300"
			>
				<slot name="append" />
			</span>
		{/if}
</div>
