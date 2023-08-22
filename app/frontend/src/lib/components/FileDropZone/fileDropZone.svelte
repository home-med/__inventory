<script lang="ts">
	import { generateID } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/Elements/Button.svelte';

	const dispatch = createEventDispatcher();

	
	const id = generateID();
	let files: FileList | undefined;
	let input: HTMLInputElement;
	

	const onDrop = (e: DragEvent) => {
		e.preventDefault();
		const _files = e.dataTransfer?.files;
		const dt = new DataTransfer();
		Array.prototype.forEach.call(_files, (file) => {
			dt.items.add(file);
		});
		
		files = dt.files
		input.files = files;
		dispatch("filesUpdated", {files});
	};

	const removeItem = (item: File) => {
		const dt = new DataTransfer();
		Array.prototype.forEach.call(files, file => {
			if (file !== item) dt.items.add(file);
		});

		files = dt.files
		input.files = files;
		dispatch("filesUpdated", {files});
	}

	const onChange = (e: Event) => {
		if (e.target instanceof HTMLInputElement && e.target.files) {
			files = e.target.files;
			dispatch("filesUpdated", {files});
		}
	};
</script>

<div class="flex flex-1 gap-x-5">
<div
	class="flex justify-center items-center p-5 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer w-[25rem] h-[15rem] shrink hover:bg-gray-100"
	on:click={() => input.click()}
	on:keypress={() => input.click()}
	on:drag
	on:dragstart
	on:dragend
	on:dragover|preventDefault
	on:dragenter
	on:dragleave
	on:drop={onDrop}
>
	<svg
		aria-hidden="true"
		class="mb-3 w-10 h-10 text-gray-400"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
		/></svg
	>
	<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
		<span class="font-semibold">Click to upload</span> or drag and drop
	</p>
	<label for={id} class="flex flex-col items-center" tabIndex="0">
	<input
		{id}
		type="file"
		name="files"
		multiple
		bind:files
		bind:this={input}
		on:change={onChange}
		class="hidden"
	/>
	</label>	
</div>
<ol class="flex flex-col gap-y-1">
	{#if files}
	{#each files as file}
	<li class="flex gap-x-2">
		<Button kind="danger" class="px-2 py-0" on:click={() => removeItem(file)}>X</Button>
		<span class="inline-block">{file.name}</span>
	</li>
	{/each}
	{/if}
</ol>
</div>
