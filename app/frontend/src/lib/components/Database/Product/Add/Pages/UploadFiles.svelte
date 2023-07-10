<script lang="ts">
	import { Button, FileUploader  } from "carbon-components-svelte";
	import SetVisibility from "$lib/components/Database/SetVisibility/SetVisibility.svelte";

	import toast from "svelte-french-toast";

	import { enhance } from "$app/forms";

	import type { SubmitFunction } from "@sveltejs/kit";

  let group: string[] = [];
  let loading: boolean = false;
  let files: File[];
  let accept: string[];

  const submitForm: SubmitFunction = ({form: formElement}) => {
    loading = true;
    return async({result, update}) => {
      loading = false;
      group = [];
      formElement.reset();
      if (result.type === 'success') {
        toast.success('Products uploaded.');
        update();
      } else {
        
      }
    }
  }
</script>

<div class="tab-content" data-tab-id="file">
  <form action="?/addProductFile" method="POST" enctype="multipart/form-data" use:enhance={submitForm}>
    <div class="form-group">
      <FileUploader name="files" bind:files multiple {accept} labelTitle="Upload Files" buttonLabel="Add Files" status="edit" />
    </div>
    <SetVisibility />
    <div class="form-group">
      <Button type="submit">Add Products</Button>
    </div>
  </form>
</div>
