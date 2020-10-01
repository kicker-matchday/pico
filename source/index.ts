import {cloneBody} from './clone'
import {Container, createContainer} from './container'
import 
	containerToPngDataURL,
} from './export'
import {Fluture} from './future'
import {inlineExternalResources} from './inline'
import {
	Options,
	defaults as defaultOptions_
} from './options'

export const defaultOptions = defaultOptions_

const generateExport = (
	$window: Window,
	options: Options
): Fluture<DetailedError, ErrorStack<Container>> =>
	pipe(
		// Create container where we'll store extracted
		// information about the window (which could fail) in
		createContainer($window),

		flutureFromEither,

		// Clone existing window data into a container,
		// including filling out <input>'s, copying <canvas>
		// elements, etc.  mapEither(cloneBody),
		mapFluture(cloneBody(options.ignore)),

		// Inline external stylesheets, images, fonts as data
		// URL's inside of the copied tree
		chainFluture(inlineExternalResources)
	)

export const dataUrl = (container) => {
	return containerToPngDataURL(container)
}
