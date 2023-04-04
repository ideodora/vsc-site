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
			<summary>.vscode</summary>
			<p><a href="/settings.json">settings.json</a></p>
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

			{#each [...$page.data.archives.values()] as yearCat (yearCat.label)}
				<details>
					<summary>{yearCat.label}</summary>
					{#each [...yearCat.children.values()] as monthCat (monthCat.label)}
						<details>
							<summary>{monthCat.label}</summary>
							{#each monthCat.children as child (child.id)}
								<p><a href={`/blog/${child.id}`}>{child.title}</a></p>
							{/each}
						</details>
					{/each}
				</details>
			{/each}
		</details>

		<p>.gitignore</p>
		<p>package.json</p>
		<p>README.md</p>
		<p><a href="/tsconfig.json">tsconfig.json</a></p>
		<p><a href="/">index.html</a></p>
		<p><a href="/sample">sample.html</a></p>
		<p><a href="/inquiry">conatct me</a></p>
		<p><a href="/admin">admin</a></p>
		<p><a href="/admin/login">login</a></p>
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
	/* .sidebar > details > details > details > p {
		@apply pl-6 py-1 pr-1 hover:bg-base-500;
	} */
	.sidebar > details > details > details > details > summary {
		@apply pl-7 py-1 pr-1 hover:bg-base-500;
	}
	.sidebar > details > details > details > details > p {
		@apply pl-8 py-1 pr-1 hover:bg-base-500;
	}
</style>
