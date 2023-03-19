<div class="sidebar text-gray-100 text-xs">
	<details>
		<summary>開いているエディター</summary>
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
		@apply p-1 bg-[#272823];
	}
	.sidebar > details > p {
		@apply pl-2 py-1 pr-1 hover:bg-[#272823];
	}
	.sidebar > details > details > summary {
		@apply pl-3 py-1 pr-1 hover:bg-[#272823];
	}
	.sidebar > details > details > p {
		@apply pl-4 py-1 pr-1 hover:bg-[#272823];
	}
	.sidebar > details > details > details > summary {
		@apply pl-5 py-1 pr-1 hover:bg-[#272823];
	}
	.sidebar > details > details > details > p {
		@apply pl-6 py-1 pr-1 hover:bg-[#272823];
	}
</style>
