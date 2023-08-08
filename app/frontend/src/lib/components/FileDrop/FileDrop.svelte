<script lang="ts">
	import { FormGroup, Checkbox, TextArea } from 'carbon-components-svelte';
	import {FileDropZone} from '$lib/components/FileDropZone';

	let isFirstRowHeaders: boolean = true;
	let files: FileList;

	const onDrop = (e: DragEvent) => {
		e.preventDefault();
		if (e.dataTransfer?.items) {
			[...e.dataTransfer.items].forEach(item=> {
				const file = item.getAsFile();
				if (file) {

				}
			})
		}
	}

	const onChange = (e: Event) => {
		console.log(e);
	}

	$: {
		if (files?.length > 0) console.log([...files]);
	}
</script>

<FormGroup legendText="Files">
<FileDropZone />
</FormGroup>
<FormGroup legendText="Options">
	<Checkbox
		labelText="First row has headers"
		name="isFirstRowHeaders"
		value="yes"
		bind:checked={isFirstRowHeaders}
	/>
	{#if !isFirstRowHeaders}
		<TextArea
			labelText="Headers"
			name="headers"
			helperText='Each header should be on its own line.'
		/>
	{/if}
</FormGroup>
