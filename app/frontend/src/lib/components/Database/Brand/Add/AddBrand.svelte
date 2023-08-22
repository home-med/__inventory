<script lang="ts">
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import { submitForm } from '$lib/components/Database/db_utils';
	import Single from './Tabs/Single.svelte';
	import UploadFiles from './Tabs/UploadFiles.svelte';
</script>

<Tabs>
	<Tab label="File upload" />
	<Tab label="Single Item" />
	<svelte:fragment slot="content">
		<TabContent><UploadFiles on:submit={submitForm} /></TabContent>
		<TabContent><Single on:submit={submitForm} /></TabContent>
	</svelte:fragment>
</Tabs>
