#!/usr/bin/env node

'use strict';

const mkdirp = require('mkdirp');

const https = require('follow-redirects').https;

const boxen = require('boxen');

const fs = require('fs');

const colors = require('colors/safe');

const argv = require('yargs')

	.usage(colors.cyan.bold('\nUsage : $0 -u [user-name] -n [image-name]'))

	.demand(['u', 'n'])

	.describe('u', colors.cyan.bold('❱ ') + ' username of instagram user ')

	.describe('n', colors.cyan.bold('❱ ') + ' save image as              ')

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

const savedIn = removeSlash.replace('/', '');

mkdirp(removeSlash, err => {
	if (err) {
		console.log(colors.red.bold('\n ❱Directory Created      :    ✖\n'));

		process.exit(1);
	} else {
		/* no need */
	}
});

// for checking whether the remote image is available in high resolution or not.
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
		return ['notHD'];

		// because matchURL gives output in array
	} else if (matchURL[0] === arrIndex[0]) {
		return ['HD'];
	}
}

// parsing images based on the resolution obtained.
function parsedImages(imgLink) {
	const findPattern = imgLink.match(/150/g);

	// null because
	const nullFire = null;

	// finding the least resolution provided by instagram.
	const gotPattern = ['150'];

	// not all profile pictures are available on HD
	if (nullFire === findPattern) {
		// if pixel is missing
		return imgLink.replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '');
	} else if (findPattern[0] === gotPattern[0]) {
		// if pixel is available
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

// checking internet connection
checkInternet(isConnected => {
	if (isConnected) {
		console.log(colors.cyan.bold('\n ❱ Internet Connection   :    ✔\n'));
	} else {
		// stop the whole process if the network is unreachable
		console.log(colors.red.bold('\n ❱ Internet Connection   :    ✖\n'));
		process.exit(1);
	}
});

const req = https.request(options, res => {
	if (res.statusCode === 200) {
		console.log(colors.cyan.bold(' ❱ Valid Username        :    ✔'));

		setTimeout(() => {
			mkdirp(removeSlash, err => {
				if (err) {
					// optional
					console.log(colors.red.bold(boxen('Sorry! Couldn\'t create the desired directory')));
				} else {
					/* do nothing */
				}
			});
		}, 1500);
	} else {
		// stopping the whole process if the username is invalid
		console.log(colors.red.bold(' ❱ Valid Username        :    ✖\n'));
		process.exit(1);
	}

	let store = '';

	res.setEncoding = 'utf8';

	res.on('data', d => {
		store += d;
	});
	res.on('end', () => {
		const imagePattern = new RegExp(/profile_pic_url":"[a-zA-Z://\\-a-zA-Z.0-9\\-a-zA-Z.0-9]*/);

		// regex to match the parsed image patterns.
		const regMatches = store.match(imagePattern);

		// [0] because we need only one link
		if (regMatches && regMatches[0]) {
			const imageLink = regMatches[0].replace('profile_pic_url":"', '');

			// storing func's output in a variable.
			const imageHD = detectFullSize(imageLink);

			// stroing initial HD'ed image in array
			const hdArray = ['HD'];

			// storing initial notHD'ed image in array
			const notHDArray = ['notHD'];

			if (hdArray[0] === imageHD[0]) {
				// because initiall imageHD shows output in array ['150', '150'] and null
				console.log(colors.cyan.bold('\n ❱ Image Resolution      :    ✔\n'));

				// if case is null
			} else if (notHDArray[0] === imageHD[0]) {
				console.log(colors.red.bold('\n ❱ Image Resolution      :    ✖\n'));
			}

			// using previously made function
			const remChars = parsedImages(imageLink);

			// saving image
			const imageFile = fs.createWriteStream(removeSlash + argv.n + '.jpg');

			// downloading image
			https.get(remChars, res => {
				res.pipe(imageFile);

				console.log(colors.cyan.bold(' ❱ Image Saved In        : '), ' ', colors.green.bold(savedIn), colors.cyan.bold(' ❱ '), colors.green.bold(argv.n + '.jpg\n'));
			}).on('error', err => {
				console.log(err);

				console.log('❱ Failed to Save the image');

				process.exit(1);
			});
		}
	});
});
req.end();
