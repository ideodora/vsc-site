<script lang="ts">
	import { user } from '$lib/shared/store/user';
	import Spinner from '$lib/components/spinner/index.svelte';
	import LoginRequired from '$lib/components/login-required/index.svelte';
</script>

{#if $user === undefined}
	<div class="row-span-2">
		<Spinner />
	</div>
{:else if $user}
	<div class="admin-main row-span-2 bg-neutral-400 text-gray-800">
		<slot />
	</div>
{:else}
	<LoginRequired />
{/if}

<style lang="postcss">
	:global(.admin-main a) {
		@apply underline text-blue-500;
	}
</style>
