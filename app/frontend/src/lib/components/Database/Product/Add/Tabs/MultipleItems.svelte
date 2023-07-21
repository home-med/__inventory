<script lang="ts">
	import { Button, Form, FormGroup, TextArea } from "carbon-components-svelte";

	import SetVisibility from "$lib/components/Database/SetVisibility/SetVisibility.svelte";
	import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

function handleSubmit(event: Event) {
  if (!(event.target instanceof HTMLFormElement)) return;
  event.preventDefault();
  const data = new FormData(event.target);
  dispatch('submit', { event, data });
}
</script>
<div class="tab-content" data-tab-id="multi">
  <Form action="?/addProductMultiple" method="POST" on:submit={handleSubmit}>
    <FormGroup>
      <TextArea
        labelText="Products"
        name="products"
        helperText="Copy / paste CSV file to the input field. Include header row."
        on:input
      />
    </FormGroup>
    <SetVisibility />
    <FormGroup>
      <Button type="submit">Add Products</Button>
    </FormGroup>
  </Form>
</div>
