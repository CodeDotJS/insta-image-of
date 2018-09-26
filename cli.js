#!/usr/bin/env node

'use strict';

const os = require('os');
const dns = require('dns');
const fs = require('fs');
const isURL = require('is-url');
const fse = require('fs-extra');
const https = require('follow-redirects').https; // eslint-disable-line prefer-destructuring
const got = require('got');
const download = require('download');
const ora = require('ora');
const chalk = require('chalk');
const logUpdate = require('log-update');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const spinner = ora();
const end = process.exit;
const arg = process.argv[2];
const user = process.argv[3];
const pre = chalk.cyan.bold('›');
const pos = chalk.red.bold('›');
const dir = `${os.homedir()}/Instagram/`;
const url = `https://instagram.com/${user}/`;
const fileName = Math.random().toString(20).substr(2, 8);

const dim = foll => {
	return chalk.dim(foll);
};

const checkConnection = () => {
	dns.lookup('instagram.com', err => {
		if (err) {
			logUpdate(`\n${pos} ${dim('Please check your internet connection!')}\n`);
			end(1);
		}
		logUpdate();
		spinner.text = 'Checking';
		spinner.start();
	});
};

const noUserArg = () => {
	if (!user) {
		logUpdate(`\n${pos} ${dim('<username/link> required\n')}`);
		end(1);
	}
};

const returnBase = () => {
	noUserArg();
	checkConnection();
};

const errorMessage = () => {
	logUpdate(`\n${pos} ${user} ${dim('is not an Instagram user!')}\n`);
	spinner.stop();
	end(1);
};

const downloadMessage = () => {
	logUpdate();
	spinner.text = 'Downloading Media';
};

const privateError = () => {
	logUpdate(`\n${pos} Maybe \n\n${pre} ${dim('Broken link')} or\n${pre} ${dim('Media shared by private profile')}\n`);
	end(1);
};

const checkURL = link => {
	if (isURL(link) === false) {
		logUpdate(`\n${pos} ${dim('Please enter a valid url!')}\n`);
		end(1);
	}
};

fse.ensureDir(dir, err => {
	if (err) {
		end(1);
	}
});

const argArray = ['-s', '--small', '-m', '--medium', '-f', '--full', '-r', '--regular', '-a', '--all', '-l', '--link', '-v', '--video'];

if (!arg || arg === '-h' || arg === '--help' || argArray.indexOf(arg) === -1) {
	console.log(`
 ${chalk.cyan('Usage')} : instavim ${chalk.cyan('[command]')} ${chalk.white('<username/link>')}

 ${chalk.cyan('Command')} :
  -s, ${dim('--small')}     downlaod profile picture of resolution ${chalk.yellow('150px')}
  -m, ${dim('--medium')}    download profile picutre of resolution ${chalk.yellow('320px')}
  -r, ${dim('--regular')}   download profile picture of resolution ${chalk.yellow('640px')}
  -f, ${dim('--full')}      download profile picture of resolution ${chalk.yellow('1080px')}

 ${chalk.cyan('Command')} :
  -a, ${dim('--all')}       download all images/videos from a link
  -l, ${dim('--link')}      download image via link
  -v, ${dim('--video')}     download video via link

 ${chalk.cyan('Example')} : instavim -f 9gag
           instavim -l <link>
  `);
	end(1);
}

logUpdate();
spinner.text = 'Please Wait!';
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
				end(1);
			});
		});
	});
};

const removeCaption = link => {
	return link.split('?')[0];
};

const resolutionSmall = () => {
	returnBase();
	got(url).then(res => {
		downloadMessage();
		const link = res.body.split('"profile_pic_url":"')[1].split('",')[0];
		downloadMedia(link, 'jpg', 'Image');
	}).catch(error => {
		if (error) {
			errorMessage();
		}
	});
};

const resolutionMedium = () => {
	returnBase();
	got(url).then(res => {
		downloadMessage();
		const link = res.body.split(',"profile_pic_url_hd":"')[1].split('",')[0];
		downloadMedia(link, 'jpg', 'Image');
	}).catch(error => {
		if (error) {
			errorMessage();
		}
	});
};

const resolutionRegular = () => {
	returnBase();
	got(url).then(res => {
		const user = res.body.split(',"id":"')[1].split('",')[0];
		const userProfile = `https://i.instagram.com/api/v1/users/${user}/info/`;
		got(userProfile, {json: true}).then(res => {
			downloadMessage();
			const link = res.body.user.hd_profile_pic_versions[1].url;
			downloadMedia(link, 'jpg', 'Image');
		}).catch(error => {
			if (error) {
				logUpdate(`\n${pos} ${dim('The requested size is currently not available!')} \n`);
				end(1);
			}
		});
	});
};

const resolutionFull = () => {
	returnBase();
	got(url).then(res => {
		downloadMessage();
		const user = res.body.split(',"id":"')[1].split('",')[0];
		const fetchProfile = `https://i.instagram.com/api/v1/users/${user}/info/`;
		got(fetchProfile, {json: true}).then(res => {
			const link = res.body.user.hd_profile_pic_url_info.url;
			downloadMedia(link, 'jpg', 'Image');
		});
	}).catch(error => {
		if (error) {
			errorMessage();
		}
	});
};

const grabAllContent = () => {
	returnBase();
	checkURL(user);
	const grab = user.split('?')[0] + '?__a=1';
	got(grab, {json: true}).then(res => {
		const base = res.body.graphql.shortcode_media.edge_sidecar_to_children.edges;
		const keeper = {meta: []};
		for (let i = 0; i < base.length; i++) {
			const video = base[i].node.video_url;
			const image = base[i].node.display_resources[2].src;
			video === undefined ? keeper.meta.push(image) : keeper.meta.push(video); // eslint-disable-line no-unused-expressions
		}
		const content = keeper.meta;
		logUpdate();
		spinner.text = 'Downloading files...';
		Promise.all(content.map(x => download(x, dir))).then(() => {
			logUpdate(`\n${chalk.cyan.bold('✓')} Download Complete! \n\n${chalk.cyan.bold('✓')} ${content.length} files saved in ${chalk.blue(dir)} \n`);
			spinner.stop();
		});
	}).catch(error => {
		if (error) {
			privateError();
		}
	});
};

const imageViaLink = () => {
	returnBase();
	checkURL(user);
	got(removeCaption(user)).then(res => {
		downloadMessage();
		const link = res.body.split('<meta property="og:image" content="')[1].split('"')[0];
		downloadMedia(link, 'jpg', 'Image');
	}).catch(error => {
		if (error) {
			privateError();
		}
	});
};

const videoViaLink = () => {
	returnBase();
	checkURL(user);
	got(removeCaption(user)).then(res => {
		downloadMessage();
		const link = res.body.split('<meta property="og:video" content="')[1].split('"')[0];
		downloadMedia(link, 'mp4', 'Video');
	}).catch(error => {
		if (error) {
			privateError();
		}
	});
};

if (arg === '-s' || arg === '--small') {
	resolutionSmall();
} else if (arg === '-m' || arg === '--medium') {
	resolutionMedium();
} else if (arg === '-r' || arg === '--regular') {
	resolutionRegular();
} else if (arg === '-f' || arg === '--full') {
	resolutionFull();
} else if (arg === '-a' || arg === '--all') {
	grabAllContent();
} else if (arg === '-l' || arg === '--link') {
	imageViaLink();
} else if (arg === '-v' || arg === '--video') {
	videoViaLink();
}
