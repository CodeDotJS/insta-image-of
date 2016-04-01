#!/usr/bin/env node

'use strict';

const mkdirp = require('mkdirp');

const https = require('follow-redirects').https;

const boxen = require('boxen');

const fs = require('fs');

const colors = require('colors');

colors.setTheme({
	error: ['red', 'bold']
});

colors.setTheme({
	info: ['cyan', 'bold']
});

colors.setTheme({
	normal: ['green', 'bolds']
});

const argv = require('yargs')

	.usage('\nUsage : $0 -u [user-name] -n [image-name]'.info)

	.demand(['u', 'n'])

	.describe('u', '❱ '.info + 'username of instagram user.')

	.describe('n', '❱ '.info + 'save image as.')

	.argv;

const options = {

	hostname: 'www.instagram.com',

	port: 443,

	path: '/' + argv.u,

	method: 'GET',

	headers: {

		'accept': 'text/html,application/json,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',

		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',

		'Host': 'www.instagram.com',

		'Connection': 'Keep-Alive',

		'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6'

	}

};

const saveImage = './Instagram/';

const removeSlash = saveImage.replace('./', '');

mkdirp(removeSlash, err => {
	if (err) {
		console.log('Sorry! Couldn\'t create the desired directory');

		process.exit();
	} else {
		/* no need */
	}
});

function detectFullSize(urls) {
	// checking the small size image.
	const matchURL = urls.match(/150/g);

	// available pixels
	const badCase = null;

	const checkURL = matchURL;

	// storing pixel in array
	const arrIndex = ['150'];

	// checking if the pixles is available in the link
	if (badCase === checkURL) {
		return ['HD'];

		// because matchURL gives output in array
	} else if (matchURL[0] === arrIndex[0]) {
		return ['notHD'];
	}
}

function parsedImages(imgLink) {
	const findPattern = imgLink.match(/150/g);

	const nullFire = null;

	const gotPattern = ['150'];

	if (nullFire === findPattern) {
		return imgLink.replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '');
	} else if (findPattern[0] === gotPattern[0]) {
		return imgLink.replace('/s150x150', '').replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '');
	}
}

function checkInternet(cb) {
	require('dns').lookup('instagram.com', err => {
		if (err && err.code === 'ENOTFOUND') {
			cb(false);
		} else {
			cb(true);
		}
	});
}

checkInternet(isConnected => {
	if (isConnected) {
		console.log('\n Internet Connection : ✔\n');
	} else {
		console.log('\n Internet Connection : ✖\n');
		process.exit(1);
	}
});

const req = https.request(options, res => {
	if (res.statusCode === 200) {
		console.log('Valid Username : ✔');

		setTimeout(() => {
			mkdirp(removeSlash, err => {
				if (err) {
					console.log(boxen('Sorry! Couldn\'t create the desired directory'));
				} else {
					console.log('Directory Created');
				}
			});
		}, 1500);
	} else {
		console.log(' Valid Username      : ✖');
		process.exit(1);
	}

	let store = '';

	res.setEncoding = 'utf8';

	res.on('data', d => {
		store += d;
	});
	res.on('end', () => {
		const imagePattern = new RegExp(/profile_pic_url":"[a-zA-Z://\\-a-zA-Z.0-9\\-a-zA-Z.0-9]*/);

		const regMatches = store.match(imagePattern);

		if (regMatches && regMatches[0]) {
			const imageLink = regMatches[0].replace('profile_pic_url":"', '');

			const imageHD = detectFullSize(imageLink);

			const hdArray = ['HD'];

			const notHDArray = ['notHD'];

			if (hdArray[0] === imageHD[0]) {
				console.log('Image is not in HD');
			} else if (notHDArray[0] === imageHD[0]) {
				console.log('Image is in HD');
			}

			const remChars = parsedImages(imageLink);

			console.log(remChars);

			const imageFile = fs.createWriteStream(removeSlash + argv.n + '.jpeg');

			https.get(remChars, res => {
				res.pipe(imageFile);

				console.log('❱ Image Saved');
			}).on('error', err => {
				console.log(err);

				console.log('❱ Failed to Save the image');

				process.exit(1);
			});
		}
	});
});
req.end();
