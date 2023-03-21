<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { pageHistoryArray, pageHistory } from '$lib/shared/store/page-history';
	import Close from 'svelte-google-materialdesign-icons/Close.svelte';

	let activePath: string | null;

	const clearHistory = (history: PageHistory) => {
		if ($pageHistoryArray.length > 1) {
			pageHistory.delete(history.path);
			const otherPath = $pageHistoryArray.slice(-1).pop()!;
			goto(otherPath.path);
		}
	};

	$: activePath = $page.url.pathname;
</script>

<div class="sidebar text-gray-100 text-xs">
	<details>
		<summary>開いているページ</summary>
		{#each $pageHistoryArray as history (history.path)}
			<p class="group flex items-center" class:active={history.path === activePath}>
				<button
					class="invisible group-hover:visible group-[.active]:visible mr-2"
					type="button"
					on:click={() => clearHistory(history)}
				>
					<Close size={16} />
				</button>
				<a class="grow" href={history.path}>{history.label}</a>
			</p>
		{/each}
	</details>
	<details open>
		<summary>MY-SITE</summary>
		<details>
			<summary>.svelte-kit</summary>
			<details>
				<summary>generated</summary>
			</details>
			<details>
				<summary>types</summary>
			</details>
			<p>ambient.d.ts</p>
			<p>tsconfig.json</p>
		</details>

		<details>
			<summary>.vscode</summary>
			<details><summary>.bin</summary></details>
			<details><summary>.vite</summary></details>
			<details><summary>.@esbuild</summary></details>
		</details>

		<details>
			<summary>src</summary>
			<details>
				<summary>lib</summary>
			</details>
			<details>
				<summary>routes</summary>
			</details>
			<p>app.css</p>
			<p>app.d.ts</p>
			<p>app.html</p>
			<p>index.test.ts</p>
		</details>

		<details>
			<summary>tests</summary>
			<p>test.ts</p>
		</details>

		<details open>
			<summary>blog</summary>
			{#each $page.data.routes as route (route.id)}
				<p><a href={`/blog/${route.id}`}>{route.title}</a></p>
			{/each}
		</details>

		<p>.gitignore</p>
		<p>package.json</p>
		<p>README.md</p>
		<p><a href="/tsconfig.json">tsconfig.json</a></p>
		<p><a href="/">index.html</a></p>
		<p><a href="/sample">sample.html</a></p>
	</details>
	<details>
		<summary>アウトライン</summary>
	</details>
	<details>
		<summary>タイムライン</summary>
	</details>
	<details>
		<summary>NPM SCRIPTS</summary>
	</details>
</div>

<style lang="postcss">
	.sidebar > details > summary {
		@apply p-1 bg-base-500;
	}
	.sidebar > details > p {
		@apply pl-2 py-1 pr-1 hover:bg-base-500;
	}
	.sidebar > details > p.active {
		@apply bg-base-100;
	}
	.sidebar > details > details > summary {
		@apply pl-3 py-1 pr-1 hover:bg-base-500;
	}
	.sidebar > details > details > p {
		@apply pl-4 py-1 pr-1 hover:bg-base-500;
	}
	.sidebar > details > details > details > summary {
		@apply pl-5 py-1 pr-1 hover:bg-base-500;
	}
</style>
