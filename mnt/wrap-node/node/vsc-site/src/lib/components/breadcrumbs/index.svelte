<div class="breadcrumbs flex p-2 text-xs text-stone-400">
	<a href="/">home</a>
	<a href="/sample">sample</a>
</div>

<style lang="postcss">
	.breadcrumbs a:has(+ a):after {
		content: '>';
		@apply mx-2;
	}
</style>
