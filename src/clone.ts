import { Tree } from './container';

const PICO_CLONE_ID_KEY = 'picocloneid';

function generateId() {
	return Math.random()
		.toString(32)
		.substring(2);
}

function isHTMLElement(
	element: Element
): element is HTMLElement {
	return element instanceof HTMLElement;
}

// Even though this function uses `querySelectorAll('*')` it's relatively
// fast - on a page with 25k nodes (youtube) it executes in 10-15ms
const getScrolledElements = (
	$target: HTMLElement
): HTMLElement[] => {
	return Array.from($target.querySelectorAll('*'))
		.filter(
			$el => $el.scrollTop !== 0 || $el.scrollLeft !== 0
		)
		.filter(isHTMLElement);
};

const attachCloneID = ($target: HTMLElement) => {
	for (const $element of [
		...$target.querySelectorAll('input'),
		...$target.querySelectorAll('textarea'),
		...$target.querySelectorAll('canvas'),
		...getScrolledElements($target)
	]) {
		$element.dataset[PICO_CLONE_ID_KEY] = generateId();
	}
};

const removeCloneID = ($target: HTMLElement) => {
	for (const $element of $target.querySelectorAll(
		`[data-${PICO_CLONE_ID_KEY}]`
	)) {
		if (!($element instanceof HTMLElement)) {
			console.warn(
				'Element that had a pico clone id attached was not an HTMLElement during cleanup',
				$element
			);

			continue;
		}

		$element.removeAttribute(`data-${PICO_CLONE_ID_KEY}`);
	}
};

export const cloneBody = (source: HTMLElement, tree: Tree): Tree => {
	attachCloneID(tree.html);

	tree.html.className = source.className;
	tree.html.style.cssText = source.style.cssText;

	// Fix for `rem` units
	tree.svg.style.fontSize = window.getComputedStyle(
		source
	).fontSize;

	const $clonedBody = source.cloneNode(
		true
	);

	tree.html.appendChild($clonedBody);
	// cloneInputs(container);
	// cloneCanvases(container);
	// cloneScrolls(container);

	if ($clonedBody instanceof HTMLBodyElement) {
		tree.html.style.margin = '0';
	}

	removeCloneID(tree.html);

	return tree;
};
