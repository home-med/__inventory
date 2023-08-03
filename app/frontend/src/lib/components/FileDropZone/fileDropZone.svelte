<script lang="ts">
	import { generateID } from '$lib/utils';

	export let id: string = generateID();
	export let name: string;
	export let labelText: string = '';
  export let multiple: boolean|undefined;
  export let accept: string[] = ["*"];

  let files: File[] = [];

	const handleFiles = (files: File[]) => {
		console.log(files);
	};

  const deleteItem = (name: string) => files = files.filter(item => item.name !== name);

  const onChange = (e: Event) => {
    console.log(e);
  }

	const onDrop = (e: Event) => {
    console.log(e);
    let dt;
    let dtFiles;
    if (e instanceof DragEvent) {
      dt = e.dataTransfer;
      dtFiles = dt?.files;
      
		} else {
      dt = e.target as HTMLInputElement;
      dtFiles = dt?.files;
    }
    if (dtFiles) {
      files = [...dtFiles];
      handleFiles(files);
    }
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="p-5 w-full border-2 border-dashed border-neutral-300 hover:border-purple-600"
	on:dragenter|preventDefault
	on:dragleave|preventDefault
	on:dragover|preventDefault
	on:drop|preventDefault={onDrop}
>
	<p class="mt-0">
		Upload multiple files with the file dialog or by dragging and dropping onto the dashed region
	</p>
	<input type="file" {id} {name} {multiple} accept={accept.join(",")} class="hidden" on:change={onDrop} />
	<label
		for={id}
		class="inline-block p-4 font-bold bg-purple-500 rounded cursor-pointer text-neutral-200"
		>{labelText}</label
	>
  <ul class="flex flex-col p-4">
    {#each files as file}
      <li class="flex mb-2 h-12 border-1 border-slate-800">
        <button
          class="px-4 py-2 bg-red-400 rounded"
          on:keypress={() => deleteItem(file.name)}
          on:click={() => deleteItem(file.name)}
        >X</button>
        <div class="px-4 basis-4/5">{file.name}</div>
      </li>
    {/each}
  </ul>
</div>
