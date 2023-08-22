<script lang="ts">
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import Single from './Tabs/Single.svelte';
	import UploadFiles from './Tabs/UploadFiles.svelte';
	import { submitForm } from '$lib/components/Database/db_utils';
</script>

<Tabs>
  <Tab label="Upload File" />
	<Tab label="Single Item" />
	<svelte:fragment slot="content">
    <TabContent><UploadFiles on:submit={submitForm} /></TabContent>
		<TabContent><Single on:submit={submitForm} /></TabContent>
	</svelte:fragment>
</Tabs>
