<script lang="ts">
	export let width = '2.5rem';
	export let stroke = 'currentColor';
	export let strokeWidth = '3px';
</script>

<svg
	viewBox="0 0 48 48"
	fill="none"
	{width}
	{stroke}
	stroke-width={strokeWidth}
	stroke-linejoin="round"
	stroke-linecap="round"
>
	<circle cx="24" cy="24" r="22" />
  <path d="M15 15, l16 20, M30 15, l-14 19" />
</svg>
