<script lang="ts">
	import type { LayoutData } from './$types';
	import { format } from '$lib/shared/helper/date';

	export let data: LayoutData; // all routes
</script>

<div class="wrap p-2 text-gray-200">
	<h1 class="ml-20 mr-4 mt-16 text-6xl ">Web, ultimately, it boils down.</h1>

	<div class="flex mt-16 ml-20 mr-4 ">
		<div class="w-1/2 ">
			<div class="text-3xl mb-4">Start from</div>
			<ul>
				<li><a href="/sample">sample.html</a></li>
				<li><a href="/tsconfig.json">tsconfig.json</a></li>
				<li><a href="/">hoge</a></li>
				<li><a href="/">hoge</a></li>
			</ul>
		</div>
		<div class="w-1/2 ">
			<div class="text-3xl mb-4">Recent updates</div>
			<ul>
				{#each data.recentUpdates as route (route.id)}
					<li>
						<a href={`/blog/${route.id}`}>
							<time class="pr-2">{format(route.postedAt, 'yyyy-MM-dd HH:mm')}</time><span
								>{route.title}</span
							>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="postcss">
	a {
		@apply text-blue-500 hover:underline;
	}
</style>
