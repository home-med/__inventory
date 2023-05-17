<details>
	<summary>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
		</svg>
	</summary>
	<small>
		<slot />
	</small>
</details>

<style>
	small {
		font-size: 0.65rem;
	}

	details {
		margin: 0;
		padding: 0;
		border: none;
	}

	details > summary {
		width: 2rem;
		height: 2rem;
		position: absolute;
		top: 0;
		right: 0;
		outline: none;
		color: hsl(216, 15%, 52%);
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		list-style: none;
	}

	details summary::after {
		display: none;
	}

  details summary:hover {
    cursor: pointer;
    opacity: 1;
  }

  details summary svg {
    width: 20px;
    height: 20px;
  }

</style>
