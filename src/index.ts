import { cloneBody } from './clone';
import { createTree } from './container';
import { canvasToPngDataURL, createCanvas } from './export';

export interface CaptureOptions {
	element: HTMLElement;
}

export default async function captureScreenshot(
	opts: CaptureOptions
): Promise<string> {
	let sourceElement = opts.element;

	let tree = createTree(sourceElement);
	cloneBody(sourceElement, tree);

	let canvas = await createCanvas(sourceElement, tree);
	return canvasToPngDataURL(canvas);
}
