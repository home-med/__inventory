<script lang="ts">
	import "../app.css";
	import Nav from "$lib/components/Nav.svelte";
	import { Toasts } from "$lib/components/Toast";
</script>

<svelte:head>
	<!-- Roboto -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:400"
	/>
	<!-- Roboto Mono -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
	<link rel="stylesheet" href="/global/css/style.css" />
	<title>Administration Page</title>
</svelte:head>

<Toasts />

<header>
	<Nav />
</header>

<main>
	<slot />
</main>

<footer>Footer</footer>

<style>
</style>
