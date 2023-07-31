<script lang="ts">
	import { FormGroup, FileUploader, Checkbox, TextInput } from "carbon-components-svelte";
	import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
	let isFirstRowHeaders: boolean = true;
  
  const onChange = (e: CustomEvent) => {
    dispatch("fileUpload", {files: e.detail, })
  }
</script>

<FormGroup legendText="Files">
  <FileUploader name="files" on:change={onChange} multiple accept={[".csv"]} labelTitle="Upload Files" buttonLabel="Add Files" status="edit" />
  </FormGroup>
  <FormGroup legendText="Options">
  <Checkbox labelText="First row has headers" name="isFirstRowHeaders" value="yes" bind:checked={isFirstRowHeaders} />
  {#if !isFirstRowHeaders}
    <TextInput labelText="Headers" name="headers" helperText='All items should be in the form of "header","header","header" with quotes.' />
  {/if}
</FormGroup>
