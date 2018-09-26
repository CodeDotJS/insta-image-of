<p align="center">
<br>
	<a href="https://www.npmjs.com/package/instavim"><img src="https://raw.githubusercontent.com/rishigiridotcom/rishigiri.com/gh-pages/github/instavim.png" alt="Instavim" width="400"></a>
	<br>
	<br>
	<img src="https://travis-ci.org/CodeDotJS/instavim.svg?branch=master">
	<img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg">
</p>

<p align="center"><b>Download profile pictures, public images, and videos available on instagram directly from command line.</b></p>


## Install

```
$ npm install --global instavim
```
__`OR`__
```
$ sudo npm install --global instavim
```

## Preview

<p align="center">
	<img src="https://raw.githubusercontent.com/rishigiridotcom/rishigiri.com/gh-pages/github/instavim-1.gif">
</p>

## Features

- Complete media downloader for Instagram.
- Download profile pictures in four different resolutions.
- Download images from the link.
- Download videos from the link.
- Download all the content from a post which has images and videos.
- Ultra fast and easy to use!

## Usage

__`NOTE`__ `:` `Images and videos will be saved under` __`Instagram`__ `folder` `in` __`home directory`__

__`Resolutions Available`__

| __`Resolution`__ | __`Size`__      |
|:----------------:|-----------------|
|  `Small`         | `150x150 px`    |
|  `Medium`        | `320x320 px`    |
|  `Regular`       | `640x320 px`    |
|  `Full`          | `1080x1080 px`  |

```
 Usage : instavim [command] <username/link>

 Command :
  -s, --small     downlaod profile picture of resolution 150px
  -m, --medium    download profile picutre of resolution 320px
  -r, --regular   download profile picture of resolution 640px
  -f, --full      download profile picture of resolution 1080px

 Command :
  -a, --all       download all images/videos from a link
  -l, --link      download image via link
  -v, --video     download video via link

 Example : instavim -f 9gag
           instavim -l <link>
```

## Related
- __[`mista`](https://github.com/CodeDotJS/mista)__ `:` `Scrape all downloadable urls of the Instagram posts that has multiple images or videos!`
- __[`migger`](https://github.com/CodeDotJS/migger)__ `:` `Download media from the URL that contains multiple images/videos on Instagram!`
- __[`instagram-profile-picture`](https://github.com/CodeDotJS/instagram-profile-picture)__ `:` `Get url to the profile picture of any instagram user in different resolutions and more!`
- __[`instagram-links`](https://github.com/CodeDotJS/Instagram-Links)__ `:` `Get links of the publicaly shared medias and profile picture available on Instagram!`
- __[`instafy`](https://github.com/CodeDotJS/instafy)__ `:` `A command line Instagram media notifier!`
- __[`istalk`](https://github.com/CodeDotJS/istalk)__ `:` `Don't pollute your browser history. Stalk Instagram users from the command line!`
- __[`image-of`](https://github.com/CodeDotJS/image-of)__ `:` `Download profile picture of any facebook user!`
- __[`gravatar-of`](https://github.com/CodeDotJS/gravatar-of)__ `:` `Download avatar of gravatar users through their email id!`
- __[`twiger`](https://github.com/CodeDotJS/twiger)__ `:` `A complete media downloader for twitter!`

## License

MIT - Copyright &copy; [Rishi Giri](http://rishigiri.ml)
