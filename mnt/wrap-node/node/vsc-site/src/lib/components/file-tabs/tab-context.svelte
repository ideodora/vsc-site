<script lang="ts">
	import { goto } from '$app/navigation';
	import { pageHistory } from '$lib/shared/store/page-history';

	export let history: PageHistory;

	const onClickCloseOthers = () => {
		for (const path of $pageHistory.keys()) {
			if (history.path !== path) {
				pageHistory.delete(path);
			}
		}
		goto(history.path);
	};

	const onClickCopyLink = async () => {
		// TODO: prefix protocol + host
		await navigator.clipboard.writeText(history.path);
	};
</script>

<div
	id="tooltip"
	role="tooltip"
	class="bg-gray-50 text-xs min-w-[30ch] text-gray-900 p-2 rounded-md"
>
	<div>{history.path}</div>
	<hr class="my-2" />
	<ul class="w-full">
		<li>
			<button
				type="button"
				class="block rounded-md text-left w-full px-2 py-1 hover:bg-blue-500 hover:text-white"
				on:click={onClickCloseOthers}>その他を閉じる</button
			>
		</li>
		<li>
			<button
				type="button"
				class="block rounded-md text-left w-full px-2 py-1 hover:bg-blue-500 hover:text-white"
				on:click={onClickCopyLink}>リンクのコピー</button
			>
		</li>
	</ul>
</div>

<style>
</style>
