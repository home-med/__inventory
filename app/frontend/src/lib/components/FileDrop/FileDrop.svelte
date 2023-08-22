<script lang="ts">
	import { FormGroup, Checkbox, TextArea } from 'carbon-components-svelte';
	import {FileDropZone} from '$lib/components/FileDropZone';

	let isFirstRowHeaders: boolean = true;
</script>

<FormGroup legendText="Files">
<FileDropZone on:filesUpdated />
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
