<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		toast.push('ログインしてください');
		goto('/admin/login');
	});
</script>
