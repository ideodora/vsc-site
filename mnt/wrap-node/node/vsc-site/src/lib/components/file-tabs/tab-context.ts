import { createPopper } from '@popperjs/core';
import type { Instance as PopperInstance } from '@popperjs/core';
import type TabContext from '$lib/components/file-tabs/tab-context.svelte';

// TODO: resolve content type
type TooltipOption = {
	content: new (options: any) => TabContext;
	history: PageHistory;
};

export function tooltip(node: HTMLElement, options: TooltipOption) {
	const button = node;
	const tooltipComponent = options.content;

	let popperInstance: PopperInstance | null;
	let componentInstance: TabContext | undefined;
	let popper: HTMLDivElement | null;
	let active = false;

	const detectClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (popper && !popper.contains(target)) {
			hide();
		}
	};

	const detectContextmenuOthers = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (button && !button.contains(target)) {
			hide();
		}
	};

	const show = (event: MouseEvent) => {
		event.preventDefault();

		if (active) return;

		popper = document.querySelector('#tooltip');
		if (popper) {
			popper.removeAttribute('data-show');
			popper.remove();
		}

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

		active = true;

		document.addEventListener('click', detectClickOutside);
		document.addEventListener('contextmenu', detectContextmenuOthers);
	};

	const hide = () => {
		popper = document.querySelector('#tooltip')!;

		if (popperInstance) {
			popperInstance.destroy();
			popperInstance = null;
		}

		componentInstance?.$destroy();

		active = false;

		document.removeEventListener('click', detectClickOutside);
		document.removeEventListener('contextmenu', detectContextmenuOthers);
	};

	button.addEventListener('contextmenu', show);

	return {
		destroy() {
			button.removeEventListener('contextmenu', show);
			document.removeEventListener('click', detectClickOutside);
			document.removeEventListener('contextmenu', detectContextmenuOthers);
		}
	};
}
