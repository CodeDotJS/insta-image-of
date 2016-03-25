#!/usr/bin/env node

'use strict';

const mkdirp = require('mkdirp');
const fs = require('fs');
const url = require('url');
const https = require('follow-redirects').https;
const boxen = require('boxen');
const request = require('request');
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

const forSaved = removeSlash.replace('/', '');

mkdirp(removeSlash, err => {
	if (err) {
		console.log('  Failed to create directory  '.warning);
	} else {
		/* do something */
	}
});

const req = https.request(options, function(res) {
	if (res.statusCode === 200) {
		console.log('\nStatus Code: '.info, '😀'.info); // res.statusCode
		mkdirp(removeSlash, err => {
			console.log('Direcotry Created', ':', '>')
		})
	} else {
		console.log('\nStatus Code: '.error, '😥'.info);
		process.exit(1);
	}

	let store = '';
	res.setEncoding('utf8');
	res.on('data', function(d) {
		store += d;
	});

	res.on('end', function() {
		const rePattern = new RegExp(
			/profile_pic_url":"[a-zA-Z://\\-a-zA-Z.0-9\\-a-zA-Z.0-9]*/);
		const arrMatches = store.match(rePattern);

		if (arrMatches && arrMatches[0]) {
			console.log('\n| '.info + argv.u.replace('/', '').toUpperCase().toString()
				.info + "'s Insta ID is ".info + arrMatches[0].replace(
					'profile_pic_url":"', '').toString().normal + ' |\n'.info);

			const validLink = arrMatches.toString().replace('\\/s150x150\\', '');
		} else {
			console.log('\nSorry '.error + argv.u.replace('/', '').toUpperCase().toString()
				.info + ' is not an Insta User.\n'.error);
		}
	});
});
req.end();
