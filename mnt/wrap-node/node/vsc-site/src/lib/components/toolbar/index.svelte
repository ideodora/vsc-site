<script>
	import Insert_drive_file from 'svelte-google-materialdesign-icons/Insert_drive_file.svelte';
	import Search from 'svelte-google-materialdesign-icons/Search.svelte';
	import Account_tree from 'svelte-google-materialdesign-icons/Account_tree.svelte';
	import Bug_report from 'svelte-google-materialdesign-icons/Bug_report.svelte';
	import Desktop_windows from 'svelte-google-materialdesign-icons/Desktop_windows.svelte';
	import Widgets from 'svelte-google-materialdesign-icons/Widgets.svelte';
	import Bookmark_border from 'svelte-google-materialdesign-icons/Bookmark_border.svelte';
	import Account_circle from 'svelte-google-materialdesign-icons/Account_circle.svelte';
	import Settings from 'svelte-google-materialdesign-icons/Settings.svelte';
</script>

<div class="toolbar flex flex-col h-full items-center text-gray-600">
	<div class="block">
		<Insert_drive_file />
	</div>
	<div class="block">
		<Search />
	</div>
	<div class="block">
		<Account_tree />
	</div>
	<div class="block">
		<Bug_report />
	</div>
	<div class="block">
		<Desktop_windows />
	</div>
	<div class="block">
		<Widgets />
	</div>
	<div class="block">
		<Bookmark_border />
	</div>

	<div class="mt-auto">
		<Account_circle />
	</div>
	<div class="block">
		<Settings />
	</div>
</div>

<style lang="postcss">
	.toolbar > div {
		@apply p-2;
	}
</style>
