<script lang="ts">
	import { onMount } from 'svelte';
	import { getDocs, collection } from 'firebase/firestore';
	import Add from 'svelte-google-materialdesign-icons/Add.svelte';

	import { db } from '$lib/firebase';
	import { format } from '$lib/shared/helper/date';

	let posts: any[] = [];

	onMount(() => {
		loadPosts();
	});

	const loadPosts = async () => {
		const collectionRef = collection(db, 'blog');
		const snapshot = await getDocs(collectionRef);
		posts = snapshot.docs.map((doc) => {
			const data = doc.data()!;
			return {
				id: doc.id,
				title: data.title,
				postedAt: data.postedAt.toDate(),
				body: data.body
			};
		});
	};
</script>

<div class="p-4">
	<div class="text-2xl mb-4 flex gap-x-2 items-center">
		<span>Blog index</span>
		<a
			href="/admin/blogs/add"
			class="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white rounded-md inline-flex text-base pl-1 pr-3 py-1"
		>
			<Add class="text-white" />
			<span class="text-white">New</span>
		</a>
	</div>
	<div class="post-list grid gap-px bg-base-800 outline outline-1 rounded-sm">
		<div class="contents font-bold">
			<div>ID</div>
			<div>TITLE</div>
			<div>POSTED AT</div>
		</div>
		{#each posts as post (post.id)}
			<div class="contents">
				<div>{post.id}</div>
				<div>{post.title}</div>
				<div>{format(post.postedAt)}</div>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.post-list {
		@apply grid-cols-[max-content,_1fr,_max-content] text-sm text-gray-200 outline-gray-800;
	}
	.post-list div {
		@apply bg-neutral-500 py-1 px-3;
	}
	.post-list .contents:first-child div {
		@apply pb-px pt-2 px-2 bg-neutral-600;
	}
</style>
