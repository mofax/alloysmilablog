<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div id="page">
	{#if data.article}
		<div id="blogarticle">
			<div class="article-body">
				<h1>{data.article.attributes.title}</h1>
				<article>
					{@html data.article.html}
				</article>
			</div>
		</div>
	{:else}
		<div>Article not found</div>
	{/if}
</div>

<style lang="scss">
	#page {
		display: flex;
		background-color: #e9e9e9;
		width: 100%;
		min-height: 100vh;
	}

	#blogarticle {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 50%;
		max-width: 960px;
		min-width: 300px;
		margin-left: auto;
		margin-right: auto;
		padding-top: 48px;
		padding-bottom: 96px;
		white-space: pre-wrap;
	}

	.article-summary {
		a {
			color: currentColor;
			text-decoration: underline;
			transition: all 0.5s;

			&:hover {
				text-decoration: none;
			}
		}
		h2 {
			margin-bottom: 12px;
		}
	}
</style>
