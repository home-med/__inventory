<script lang="ts">
	import { enhance } from "$app/forms";
	import { Button, TextArea } from "carbon-components-svelte";

	import SetVisibility from "$lib/components/Database/SetVisibility/SetVisibility.svelte";

  let group: string[] = [];
</script>
<div class="tab-content" data-tab-id="multi">
  <form action="?/addProductMultiple" method="POST" use:enhance>
    <div class="form-group">
      <TextArea
        labelText="Products"
        name="products"
        helperText="Copy / paste CSV file to the input field. Include header row."
        on:input
      />
    </div>
    <SetVisibility />
    <div class="form-group">
      <Button type="submit">Add Products</Button>
    </div>
  </form>
</div>
