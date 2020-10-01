export type WindowInfo = {
	window: Window;
	document: Document;
	html: HTMLHtmlElement;
	head: HTMLHeadElement;
	body: HTMLBodyElement;
};

export const getWindowInfo = ($window: Window): WindowInfo => {
	const $document = $window.document;
	const $head = $document.head;
	const $body = $document.body;
	const $html = $document.querySelector('html');

	if (!($html instanceof HTMLHtmlElement)) {
		throw new Error('Failed to get HTMLHtmlElement');
	}

	if (!($body instanceof HTMLBodyElement)) {
		throw new Error('Failed to get HTMLBodyElement');
	}

	return {
		window: $window,
		document: $document,
		html: $html,
		head: $head,
		body: $body
	};
};
