import {
	createElement,
	createSVGElement,
	xhtmlNS
} from './element';
import { getElementSize } from './utils';

export type Tree = {
	html: HTMLHtmlElement;
	head: HTMLHeadElement;
	svg: SVGSVGElement;
};

const getBackgroundColor = ($element: HTMLElement): string => {
	const { backgroundColor } = window.getComputedStyle(
		$element
	);

	return backgroundColor === 'transparent' ||
		backgroundColor === 'rgba(0, 0, 0, 0)'
		? 'white'
		: backgroundColor;
};

export const createTree = (source: HTMLElement): Tree => {
	const size = getElementSize(source);
	const h = createElement(window.document);
	const s = createSVGElement(window.document);

	const $iframe = h('iframe', {
		width: size.width + 'px',
		height: size.height + 'px'
	});

	const $svg = s('svg', {
		width: size.width + 'px',
		height: size.height + 'px'
	});

	$svg.style.backgroundColor = getBackgroundColor(source);

	const $foreignObject = s('foreignObject', {
		x: '0',
		y: '0',
		width: size.width + 'px',
		height: size.height + 'px'
	});

	const $newHtml = h('html');
	$newHtml.setAttribute('xmlns', xhtmlNS);

	const $newHead = h('head');
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
