<script lang="ts">
	import { collection, doc, addDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { format } from '$lib/shared/helper/date';
	import TipTap from '$lib/components/tiptap/index.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { parseISO } from 'date-fns';

	let title = 'this is title';
	let postedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm");
	let tiptap: TipTap;

	const onSave = async () => {
		await addDoc(collection(db, 'blog'), {
			title,
			postedAt: parseISO(postedAt),
			body: tiptap.html()
		});
		toast.push('記事を作成しました');
	};
</script>

<div class="p-4 flex flex-col h-full">
	<div class="flex grow gap-4">
		<div class="flex flex-col gap-4">
			<div class="text-2xl mb-4 flex gap-x-2 items-center">
				<span>Blog add</span>
			</div>
			<label class="field">
				<span>Title</span>
				<input type="text" bind:value={title} />
			</label>
			<label class="field">
				<span>Posted At</span>
				<input type="datetime-local" bind:value={postedAt} />
			</label>
			<label class="field items-end">
				<button
					class="bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-700 py-1 px-4 rounded-md"
					type="button"
					on:click={onSave}>作成</button
				>
			</label>
		</div>
		<div class="grow">
			<div class="field grow">
				<TipTap bind:this={tiptap} />
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.field {
		@apply flex flex-col;
	}
</style>
