import takeScreenshot from '../src/index';

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', async () => {
	console.log('Waiting 1 second...');

	await sleep(1000);

	console.log('Taking screenshot...');
	let element = document.getElementById('example');
	let res = await takeScreenshot({ element });
	console.log(res);
});

console.log('Script loaded');
