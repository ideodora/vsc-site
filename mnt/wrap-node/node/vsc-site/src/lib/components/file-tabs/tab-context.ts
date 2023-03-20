import { createPopper } from '@popperjs/core';
import type { Instance as PopperInstance } from '@popperjs/core';
import type TabContext from '$lib/components/file-tabs/tab-context.svelte';

export function tooltip(node, options) {
	const button = node;
	const tooltipComponent = options.content;

	let popperInstance: PopperInstance | null;
	let componentInstance: TabContext;
	let popper: HTMLDivElement;

	button.addEventListener('contextmenu', show);
	// button.addEventListener('mouseout', hide);

	function show(event: MouseEvent) {
		event.preventDefault();

		componentInstance = new tooltipComponent({
			target: document.body,
			props: { history: options.history }
		});

		popper = document.querySelector('#tooltip')!;
		popper.setAttribute('data-show', '');

		popperInstance = createPopper(button, popper, {
			placement: 'bottom-start',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [50, -16]
					}
				}
			]
		});
	}

	// function hide() {
	// 	popper = document.querySelector('#tooltip')!;
	// 	popper.removeAttribute('data-show');

	// 	if (popperInstance) {
	// 		popperInstance.destroy();
	// 		popperInstance = null;
	// 	}

	// 	componentInstance.$destroy();
	// }

	return {
		destroy() {
			button.removeEventListener('contextmenu', show);
			// button.removeEventListener('mouseout', hide);
		}
	};
}
