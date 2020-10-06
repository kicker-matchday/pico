import {
	createElement,
	createSVGElement,
	xhtmlNS
} from './element';

export type Tree = {
	html: HTMLHtmlElement;
	head: HTMLHeadElement;
	svg: SVGSVGElement;
};

const getBackgroundColor = (
	$window: Window,
	$element: HTMLElement
): string => {
	const { backgroundColor } = $window.getComputedStyle(
		$element
	);

	return backgroundColor === 'transparent' ||
		backgroundColor === 'rgba(0, 0, 0, 0)'
		? 'white'
		: backgroundColor;
};

export const createTree = (source: HTMLElement): Tree => {
	const { innerWidth: width, innerHeight: height } = window;

	const h = createElement(window.document);
	const s = createSVGElement(window.document);

	const $iframe = h('iframe', {
		width: width + 'px',
		height: height + 'px'
	});

	const $svg = s('svg', {
		width: width + 'px',
		height: height + 'px'
	});

	$svg.style.backgroundColor = getBackgroundColor(
		window.window,
		source
	);

	const $foreignObject = s('foreignObject', {
		x: '0',
		y: '0',
		width: width + 'px',
		height: height + 'px'
	});

	const $newHtml = h('html');
	$newHtml.setAttribute('xmlns', xhtmlNS);

	const $newHead = h('head');
	$newHtml.appendChild($newHead);

	$newHtml.appendChild($newHead);

	$foreignObject.appendChild($newHtml);
	$svg.appendChild($foreignObject);
	$iframe.appendChild($svg);

	return {
		html: $newHtml,
		head: $newHead,
		svg: $svg
	};
};
