<script>
</script>

<div class="fixed inset-0 bg-gray-800 outer-grid grid overflow-hidden">
	<div class="col-span-3 bg-[#ff3d00] text-white px-2">this is appbar</div>
	<div class="relative">
		<div class="absolute inset-0 overflow-hidden">
			<slot />
		</div>
	</div>
	<div class="col-span-3 bg-[#ff3d00] text-white px-2">this is footer</div>
</div>

<style lang="postcss">
	.outer-grid {
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr min-content;
	}
</style>
