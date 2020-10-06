export const noop = () => {};

export const blobToDataURL = (blob: Blob): Promise<string> => {
	const reader = new FileReader();

	return new Promise((resolve, reject) => {
		reader.onloadend = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result);
			} else {
				reject(
					new Error(
						`Got invalid type when reading blob (${typeof reader.result})`
					)
				);
			}
		};

		reader.onerror = () => {
			reject(
				new Error('Failed to load data url for blob')
			);
		};

		reader.readAsDataURL(blob);
	});
};

// Type safe wrapper for URL.createObjectURL. Also because this
// function creates a reference in a global object URL store,
// this function is technically impure.
export function createObjectURL(
	object: File | Blob | MediaSource
): string {
	return URL.createObjectURL(object);
}
