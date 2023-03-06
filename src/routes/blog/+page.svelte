<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div id="page">
	<div id="blogroll">
		{#each data.articles as article}
			<div class="article-summary">
				<p>{article.date}</p>
				<a href={`/blog/${article.id}`}>{article.title}</a>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	#page {
		display: flex;
		background-color: #e9e9e9;
		width: 100%;
		height: 100vh;
	}

	#blogroll {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 50%;
		max-width: 960px;
		min-width: 300px;
		margin-left: auto;
		margin-right: auto;
		padding-top: 48px;
	}

	.article-summary {
		a {
			color: currentColor;
			text-decoration: underline;
			transition: all 0.5s;
			font-weight: bold;

			&:hover {
				text-decoration: none;
			}
		}
	}
</style>
