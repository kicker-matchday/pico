import { Tree } from './container';
import {
	blobToDataURL,
	download,
	responseToBlob
} from './utils';

// Inline all images on the page (improvement: can only
// inline *visible* images for potentially less network
// strain if cache doesn't work)
export async function inlineImages(tree: Tree) {
	let images = Array.from(tree.html.querySelectorAll('img'));
	await Promise.all(
		images.map(async image => {
			try {
				let response = await download(image.src);
				let blob = await responseToBlob(response);
				let dataUrl = await blobToDataURL(blob);
				image.src = dataUrl;
			} catch (err) {
				console.error(err);
			}
		})
	);
}
