<script lang="ts">
	import type { PageData } from './$types';
	import EditorPane from '$lib/components/editor-pane/index.svelte';
	import { format } from '$lib/shared/helper/date';

	export let data: PageData;
</script>

<EditorPane>
	<h1 class="text-3xl">{data.post.title}</h1>
	<h2 class="text-gray-400 mb-4">{format(data.post.postedAt, 'yyyy-MM-dd EEE HH:mm')}</h2>
	<div
		class="prose prose-invert outline-none"
		contenteditable="true"
		bind:innerHTML={data.post.body}
	/>
</EditorPane>

<style lang="postcss">
</style>
