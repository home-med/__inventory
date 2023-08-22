<script lang="ts">
	import { submitForm } from '$lib/components/Database/db_utils';
	import Single from "./Tabs/Single.svelte";
	import UploadFiles from "./Tabs/UploadFiles.svelte";
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';
</script>

<Tabs>
	<Tab label="File upload" />
	<Tab label="Single Item" />
	<svelte:fragment slot="content">
		<TabContent><UploadFiles on:submit={submitForm} /></TabContent>
		<TabContent><Single on:submit={submitForm} /></TabContent>
	</svelte:fragment>
</Tabs>


