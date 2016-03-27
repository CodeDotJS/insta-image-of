#!/usr/bin/env node

'use strict';

const mkdirp = require('mkdirp');

const fs = require('fs');

const url = require('url');

const https = require('follow-redirects').https;

const http = require('follow-redirects').http;

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
		console.log('Sorry! Couldn\'t create the desired directory');
		process.exit();
	} else {
		/* described below */
	}
});

const req = https.request(options, res => {
	if (res.statusCode === 200) {
		console.log('Internet Connection  ❱  ', '✔');
		mkdirp(removeSlash, err => {
			if (err) {
				console.log('Sorry! Couldn\'t create the desired directory');
			} else {
				console.log('Directory Created');
			}
		});
	} else {
		console.log('Sorry! Please check username');
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
			console.log(imageLink);
		} else {
			const noImage = 'Sorry';
			console.log(noImage);
		}
	});
});
req.end();
