<script>
</script>

<div class="spinner" />

<style>
	.spinner {
		--color: #999;
		--size: 16px;
		border-radius: 50%;
		border: 2px solid rgba(0, 0, 0, 0.1);
		border-top-color: var(--color);
		width: var(--size);
		height: var(--size);
		animation: spinner 0.6s linear infinite;
	}

	@keyframes spinner {
		to {
			transform: rotate(360deg);
		}
	}
</style>
