#!/usr/bin/env node

'use strict';

const os = require('os');
const dns = require('dns');
const fs = require('fs');
const isURL = require('is-url');
const fse = require('fs-extra');
const https = require('follow-redirects').https;
const got = require('got');
const ora = require('ora');
const chalk = require('chalk');
const logUpdate = require('log-update');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const spinner = ora();
const arg = process.argv[2];
const user = process.argv[3];
const pre = chalk.cyan.bold('›');
const pos = chalk.red.bold('›');
const dir = `${os.homedir()}/Instagram/`;
const url = `https://instagram.com/${user}/?__a=1`;
const fileName = Math.random().toString(20).substr(2, 8);

const dim = foll => {
	return chalk.dim(foll);
};

const checkConnection = () => {
	dns.lookup('instagram.com', err => {
		if (err) {
			logUpdate(`\n${pos} ${dim('Please check your internet connection!')}\n`);
			process.exit(1);
		}
		logUpdate();
		spinner.text = `Checking`;
		spinner.start();
	});
};

const noUserArg = () => {
	if (!user) {
		logUpdate(`\n${pos} ${dim('<username/link> required\n')}`);
		process.exit(1);
	}
};

const returnBase = () => {
	noUserArg();
	checkConnection();
};

const errorMessage = () => {
	logUpdate(`\n${pos} ${user} ${dim('is not an Instagram user!')}\n`);
	spinner.stop();
	process.exit(1);
};

const downloadMessage = () => {
	logUpdate();
	spinner.text = `Downloading Media`;
};

const privateError = () => {
	logUpdate(`\n${pos} Maybe \n\n${pre} ${dim('Broken link')} or\n${pre} ${dim('Media shared by private profile')}\n`);
	process.exit(1);
};

fse.ensureDir(dir, err => {
	if (err) {
		process.exit(1);
	}
});

const argArray = ['-s', '--small', '-m', '--medium', '-f', '--full', '-l', '--link', '-v', '--video'];

if (!arg || arg === '-h' || arg === '--help' || argArray.indexOf(arg) === -1) {
	console.log(`
 ${chalk.cyan('Usage')}	  : instavim [command] <username/link>

 ${chalk.cyan('Command')}  :       ${dim('<for profile picture>')}
  -s, ${dim('--small')}     downlaod profile picture in small resolution
  -m, ${dim('--medium')}    download profile picutre in medium resolution
  -f, ${dim('--full')}      download profile picture in full resolution

 ${dim('Note : It works for the accounts which are both, public and private')}

 ${chalk.cyan('Command')}  :       ${dim('<download via links>')}
  -l, ${dim('--link')}      download image via link
  -v, ${dim('--video')}     download video via link

 ${chalk.cyan('Example')}  :       instavim -f 9gag
                  instavim -l <link>

 ${dim('Note : Works only if the link is associated with public media')}
  `);
	process.exit(1);
}

logUpdate();
spinner.text = `Please Wait!`;
spinner.start();

const downloadMedia = (arg, ext, message) => {
	const saveImages = fs.createWriteStream(`${dir}${fileName}.${ext}`);
	https.get(arg, (res, cb) => {
		res.pipe(saveImages);
		saveImages.on('finish', () => {
			logUpdate(`\n${pre} ${message} Saved! ${chalk.dim(`[${fileName}.${ext}]`)} \n`);
			saveImages.close(cb);
			spinner.stop();
			saveImages.on('error', () => {
				process.exit(1);
			});
		});
	});
};

const checkURL = link => {
	if (isURL(link) === false) {
		logUpdate(`\n${pos} ${dim('Please enter a valid url!')}\n`);
		process.exit(1);
	}
};

const removeCaption = link => {
	return link.split('?')[0];
};

if (arg === '-s' || arg === '--small') {
	returnBase();
	got(url, {json: true}).then(res => {
		downloadMessage();
		const link = res.body.user.profile_pic_url;
		downloadMedia(link, 'jpg', 'Image');
	}).catch(err => {
		if (err) {
			errorMessage();
		}
	});
} else if (arg === '-m' || arg === '--medium') {
	returnBase();
	got(url, {json: true}).then(res => {
		downloadMessage();
		const link = res.body.user.profile_pic_url.replace(/150x150/g, '320x320');
		downloadMedia(link, 'jpg', 'Image');
	}).catch(err => {
		if (err) {
			errorMessage();
		}
	});
} else if (arg === '-f' || arg === '--full') {
	returnBase();
	got(url, {json: true}).then(res => {
		downloadMessage();
		const link = res.body.user.profile_pic_url.replace(/150x150/g, '');
		downloadMedia(link, 'jpg', 'Image');
	}).catch(err => {
		if (err) {
			errorMessage();
		}
	});
} else if (arg === '-l' || arg === '--link') {
	returnBase();
	checkURL(user);
	const rawFile = removeCaption(user);
	got(`${rawFile}?__a=1`, {json: true}).then(res => {
		downloadMessage();
		const link = res.body.graphql.shortcode_media.display_url;
		downloadMedia(link, 'jpg', 'Image');
	}).catch(err => {
		if (err) {
			privateError();
		}
	});
} else if (arg === '-v' || arg === '--video') {
	returnBase();
	checkURL(user);
	got(`${removeCaption(user)}?__a=1`, {json: true}).then(res => {
		downloadMessage();
		const link = res.body.graphql.shortcode_media.video_url;
		downloadMedia(link, 'mp4', 'Video');
	}).catch(err => {
		if (err) {
			privateError();
		}
	});
}
