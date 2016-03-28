#!/usr/bin/env node

'use strict';

const mkdirp = require('mkdirp');

const https = require('follow-redirects').https;

const boxen = require('boxen');

const colors = require('colors');

colors.setTheme({
	error: ['red', 'bold']
});

colors.setTheme({
	info: ['cyan', 'bold']
});

colors.setTheme({
	normal: ['green', 'bold']
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

// const forSaved = removeSlash.replace('/', '');

mkdirp(removeSlash, err => {
	if (err) {
		console.log('Sorry! Couldn\'t create the desired directory');

		process.exit();
	} else {
		/* no need */
	}
});

function detectFullSize(urls) {
	const matchURL = urls.match(/150/g);

	const badCase = null;

	const checkURL = matchURL;

	const arrIndex = ['150'];

	if (badCase === checkURL) {
		return 'HD Image isn\'t available';
	} else if (matchURL[0] === arrIndex[0]) {
		return 'HD Image is available';
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

const req = https.request(options, res => {
	if (res.statusCode === 200) {
		console.log('Internet Connection  ❱  ', '✔');

		setTimeout(() => {
			mkdirp(removeSlash, err => {
				if (err) {
					console.log(boxen('Sorry! Couldn\'t create the desired directory'));
				} else {
					console.log('Directory Created');
				}
			});
		}, 2000);
	} else {
		console.log('Sorry! Please check username');

		process.exit(1);
	}

	let store = '';

	res.setEncoding = 'utf8';

	res.on('data', d => {
		store += d;
	});

	res.on('error', err => {
		if (err.code === 'ENOTFOUND') {
			console.error('Please check your internet connection');
		} else {
			console.error(err);
		}
		process.exit(1);
	});

	res.on('end', () => {
		const imagePattern = new RegExp(/profile_pic_url":"[a-zA-Z://\\-a-zA-Z.0-9\\-a-zA-Z.0-9]*/);

		const regMatches = store.match(imagePattern);

		if (regMatches && regMatches[0]) {
			const imageLink = regMatches[0].replace('profile_pic_url":"', '');

			const imageHD = detectFullSize(imageLink);

			const remChars = parsedImages(imageLink);

			console.log(imageHD);

			console.log(remChars);
		}
	});
});
req.end();
