import { cloneBody } from './clone';
import { createTree } from './container';
import { canvasToPngDataURL, createCanvas } from './export';
import { inlineImages } from './inline';

export interface CaptureOptions {
	element: HTMLElement;
}

export default async function captureScreenshot(
	opts: CaptureOptions
): Promise<string> {
	let sourceElement = opts.element;

	let tree = createTree(sourceElement);

	// Modify tree
	await cloneBody(sourceElement, tree);
	await inlineImages(tree);

	// Export as data
	let canvas = await createCanvas(sourceElement, tree);
	return canvasToPngDataURL(canvas);
}
