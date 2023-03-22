<script lang="ts">
	export let attributes: { title: string; date: string } = {};

	const title = attributes.title || '';

	const [header, headerModifier] = title.split(':');
</script>

<div class="article-header">
	<div class="h">
		<h1>{header}</h1>
		<span class="mod">{headerModifier}</span>
	</div>
</div>

<style lang="scss">
	.h {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 12px;

		h1 {
        font-size: 4rem;
			color: #949494;
		}

        .mod {
          font-size: 1.4rem;
        text-transform: uppercase;
        }
	}
</style>
