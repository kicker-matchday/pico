import { Tree } from './container';
import { createElement } from './element';
import { getElementSize } from './utils';

export function serializeSVGToDataURL(
	$svg: SVGSVGElement
): string {
	let serialized = window.encodeURIComponent(
		new XMLSerializer().serializeToString($svg)
	);

	return `data:image/svg+xml;charset=utf-8,${serialized}`;
}

export function canvasToPngDataURL(
	$canvas: HTMLCanvasElement
): string {
	return $canvas.toDataURL('image/png', 1);
}

export function createCanvas(
	element: HTMLElement,
	tree: Tree
): Promise<HTMLCanvasElement> {
	const scalingRatio = window.devicePixelRatio || 1;
	const dimensions = getElementSize(element);
	const $canvas = createElement(window.document)('canvas', {
		width: dimensions.width * scalingRatio,
		height: dimensions.height * scalingRatio
	});

	const ctx = $canvas.getContext('2d');

	if (ctx === null) {
		throw new Error('Failed to obtain 2d canvas context');
	}

	return new Promise((resolve, reject) => {
		const $img = new Image();

		$img.onerror = () => {
			reject(
				new Error(
					'Failed to load exported <img> onto canvas'
				)
			);
		};

		$img.onload = () => {
			ctx.setTransform(
				scalingRatio,
				0,
				0,
				scalingRatio,
				0,
				0
			);

			ctx.drawImage($img, 0, 0);

			resolve($canvas);
		};

		$img.src = serializeSVGToDataURL(tree.svg);
	});
}
