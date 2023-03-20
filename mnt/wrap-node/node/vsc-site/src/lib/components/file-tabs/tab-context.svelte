<script lang="ts">
	export let history: { path: string; label: string };
</script>

<div id="tooltip" role="tooltip" class="bg-green-500 text-white">
	<div>{history.path} context menu</div>
	<ul>
		<li>その他を閉じる</li>
		<li>リンクのコピー</li>
	</ul>
</div>

<style>
	#tooltip {
		/* background: #333; */
		/* color: white; */
		/* font-weight: bold; */
		padding: 4px 8px;
		font-size: 13px;
		border-radius: 4px;
	}
</style>
