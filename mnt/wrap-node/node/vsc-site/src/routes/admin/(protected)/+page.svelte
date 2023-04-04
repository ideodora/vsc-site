<script lang="ts">
	import { getToken } from 'firebase/messaging';
	import { collection, addDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	import { PUBLIC_FCM_VAPID_KEY } from '$env/static/public';
	import { db } from '$lib/firebase';

	onMount(async () => {
		const module = await import('$lib/firebase-client');

		try {
			const token = await getToken(module.messaging, { vapidKey: PUBLIC_FCM_VAPID_KEY });

			if (token) {
				console.log(`Notification token: ${token}`);
				await addDoc(collection(db, 'notification'), { token: token });
			} else {
				console.log('No registration token available. Request permission to generate one.');
			}
		} catch (error) {
			console.log('An error occurred while retrieving token. ', error);
		}
	});
</script>

<div class="p-2">
	<h1>admin menu</h1>
	<ul class="ml-4 list-disc">
		<li>
			<a href="/admin/blogs">blog</a>
		</li>
	</ul>
</div>
