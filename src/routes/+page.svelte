<div class="wrapper glass">
	<a href="/blog">READ THE BLOG</a>
	<h1>
		Hey, I'm Alloys, a software & cloud technology professional focused on creating digital
		solutions and interactive experiences.
		<br />
	</h1>
</div>

<style lang="scss">
	h1 {
		font-size: calc(100vw / 20);
	}

	a {
		display: block;
		font-size: 16px;
		color: gray;
	}

	.wrapper {
		width: 100vw;
		height: 100vh;
		padding: 16%;
	}

	.glass {
		background: rgba(249, 255, 137, 0.53);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(3.7px);
		-webkit-backdrop-filter: blur(3.7px);
		border: 1px solid rgba(249, 255, 137, 0.3);
	}

	@media (max-width: 575px) {
		h1 {
			font-size: 28px;
		}
		a {
			margin-bottom: 28px;
		}
	}

	@media (min-width: 1200px) {
		h1 {
			font-size: 69px;
		}
	}
</style>
