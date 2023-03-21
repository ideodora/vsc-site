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
	import { sidebarHidden } from '$lib/shared/store/layout';
	import { createPopperActions } from 'svelte-popperjs';

	const [popperRef, popperContent] = createPopperActions({
		placement: 'right',
		strategy: 'fixed'
	});
	const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	};

	let showTooltip = false;

	const toggleExplorer = () => {
		$sidebarHidden = !$sidebarHidden;
	};
</script>

<div class="toolbar flex flex-col h-full items-center text-gray-600">
	<button
		type="button"
		class="block"
		class:active={!$sidebarHidden}
		use:popperRef
		on:click={toggleExplorer}
		on:focus={() => (showTooltip = true)}
		on:mouseover={() => (showTooltip = true)}
		on:mouseleave={() => (showTooltip = false)}
	>
		<Insert_drive_file />
	</button>
	<div class="block">
		<Search />
	</div>
	{#if showTooltip}
		<div
			id="tooltip"
			class="relative flex items-center z-10 bg-base-50 text-gray-300 text-xs px-2 py-1 border border-[#5B5A4D]"
			use:popperContent={extraOpts}
		>
			<span>エクスプローラー(</span>
			<svg height="12" width="12" viewBox="0 96 960 960" class="fill-current leading-4"
				><path
					d="M320 936V626H120l360-450 360 450H640v310H320Zm60-60h200V566h133L480 270 247 566h133v310Zm100-310Z"
				/>
			</svg>
			<svg class="fill-current leading-4 mr-px" height="12" width="12" viewBox="0 96 960 960"
				><path
					d="M249.899 936Q196 936 158 897.899t-38-92Q120 752 158.071 714q38.072-38 91.929-38h70V476h-70q-53.857 0-91.929-38.101-38.071-38.101-38.071-92T158.101 254q38.101-38 92-38T342 254.071q38 38.072 38 91.929v70h200v-70q0-53.857 38.101-91.929 38.101-38.071 92-38.071T802 254.101q38 38.101 38 92T801.929 438Q763.857 476 710 476h-70v200h70q53.857 0 91.929 38.101 38.071 38.101 38.071 92T801.899 898q-38.101 38-92 38T618 897.929Q580 859.857 580 806v-70H380v70q0 53.857-38.101 91.929-38.101 38.071-92 38.071Zm-.017-60Q279 876 299.5 855.583 320 835.167 320 806v-70h-70q-29.167 0-49.583 20.382Q180 776.765 180 805.882 180 835 200.382 855.5q20.383 20.5 49.5 20.5Zm460 0Q739 876 759.5 855.618q20.5-20.383 20.5-49.5Q780 777 759.583 756.5 739.167 736 710 736h-70v70q0 29.167 20.382 49.583Q680.765 876 709.882 876ZM380 676h200V476H380v200ZM250 416h70v-70q0-29.167-20.382-49.583Q279.235 276 250.118 276 221 276 200.5 296.382q-20.5 20.383-20.5 49.5Q180 375 200.417 395.5 220.833 416 250 416Zm390 0h70q29.167 0 49.583-20.382Q780 375.235 780 346.118 780 317 759.618 296.5q-20.383-20.5-49.5-20.5Q681 276 660.5 296.417 640 316.833 640 346v70Z"
				/>
			</svg>
			<span>E)</span>
			<div id="arrow" data-popper-arrow />
		</div>
	{/if}
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
	.toolbar > .block {
		@apply p-2 border-l-2 border-transparent w-full;
	}
	.toolbar > .block.active {
		@apply border-base-500;
	}

	#arrow,
	#arrow::before {
		position: absolute;
		width: 8px;
		height: 8px;
		background: inherit;
	}

	#arrow {
		visibility: hidden;
	}

	#arrow::before {
		visibility: visible;
		content: '';
		transform: rotate(45deg);
		@apply border-[#5B5A4D] border-l border-b;
	}

	:global(#tooltip[data-popper-placement^='right'] > #arrow) {
		left: -4px;
	}
</style>
