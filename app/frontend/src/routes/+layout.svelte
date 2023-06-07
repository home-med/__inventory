<script context="module">
	import Nav from "$lib/components/Nav.svelte";
	import {Toaster} from 'svelte-french-toast'
</script>
<script lang="ts">

</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/themes/light.css"
	/>
	<script
		type="module"
		src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/shoelace-autoloader.js"
	></script>
	<link rel="stylesheet" href="/global/css/style.css" />
  <title>Administration Page</title>
</svelte:head>

<header>
  <Nav />
</header>

<main>
	<Toaster />
	<slot />
</main>

<footer>
  Footer
</footer>

<style>
	
</style>
