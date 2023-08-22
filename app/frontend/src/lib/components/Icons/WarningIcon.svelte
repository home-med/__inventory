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
	<polygon points="24 4, 44 44, 4 44" />
	<line x1="24" y1="20" x2="24" y2="28" />
	<circle cx="24" cy="36" r="0.5" fill="currentColor" />
</svg>
