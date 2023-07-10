<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
</script>

<svelte:head>
	<!-- Roboto -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
	<!-- Roboto Mono -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
	<link rel="stylesheet" href="/global/css/style.css" />
  <title>Administration Page</title>
</svelte:head>

<header>
  <Nav />
</header>

<main>
	<slot />
</main>

<footer>
  Footer
</footer>

<style>
	
</style>
