<div class="grid">
	<div>
		<img src="/thumbnail.jpg" alt="screenshot" />
	</div>
	<div>
		<img class="absolute w-40 block bottom-10 left-10" src="/logo.png" alt="sevelte logo" />
	</div>
</div>

<style lang="postcss">
	.grid {
		position: relative;
		grid-template-columns: auto;
		grid-template-rows: auto;
	}
	.grid > * {
		grid-area: 1/1;
		inset: 0;
		position: relative;
	}
</style>
