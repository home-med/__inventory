<script lang="ts">
	import { FormGroup, Checkbox, TextArea } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';
	import FileDropZone from '$lib/components/FileDropZone/fileDropZone.svelte';

	let isFirstRowHeaders: boolean = true;

</script>

<FormGroup legendText="Files">
	<FileDropZone
		name="files"
		multiple
		accept={['.csv']}
		labelText="Add Files"
	/>
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
