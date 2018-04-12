<p align="center">
<br>
	<a href="https://www.npmjs.com/package/instavim"><img src="https://raw.githubusercontent.com/rishigiridotcom/rishigiri.com/gh-pages/github/instavim.png" alt="Instavim" width="400"></a>
	<br>
	<br>
	<img src="https://travis-ci.org/CodeDotJS/instavim.svg?branch=master">
	<img src="https://raw.githubusercontent.com/rishigiridotcom/rishigiri.com/gh-pages/github/instavim.png" width="50px;">
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

---
__`NOTE`__

This tool works completely fine and does everything which is mentioned in the readme, but Instagram is making continuous changes and constantly reducing the ways to retrive data.
I've fixed this tool many times in a single week and to be honest, it's kinda irritating for me to make changes on a daily basis. Feel free to file an [issue](https://github.com/CodeDotJS/instavim/issues/new) or send [Pull requests](https://github.com/CodeDotJS/instavim/pulls) in case further changes
happens in future.

Thank You!

---
## Preview

<p align="center">
	<img src="https://raw.githubusercontent.com/rishigiridotcom/rishigiri.com/gh-pages/github/instavim-1.gif">
</p>

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
 Usage	  : instavim [command] <username/link>

 Command  :       <for profile picture>
 -s, --small     downlaod profile picture in small resolution
 -m, --medium    download profile picutre in medium resolution
 -r, --regular   download profile picutre in regular resolution
 -f, --full      download profile picture in full resolution

 Note : It works for the accounts which are both, public and private

 Command  :       <download via links>
 -l, --link      download image via link
 -v, --video     download video via link

 Example  : instavim -f 9gag
            instavim -l <link>

 Note : Works only if the link is associated with public media
```

## Related

- __[`instagram-profile-picture`](https://github.com/CodeDotJS/instagram-profile-picture)__ `:` `Get url to the profile picture of any instagram user in different resolutions and more!`

- __[`instagram-links`](https://github.com/CodeDotJS/Instagram-Links)__ `:` `Get links of the publicaly shared medias and profile picture available on Instagram!`

- __[`instafy`](https://github.com/CodeDotJS/instafy)__ `:` `A command line Instagram media notifier!`

- __[`istalk`](https://github.com/CodeDotJS/istalk)__ `:` `Don't pollute your browser history. Stalk Instagram users from the command line!`

- __[`image-of`](https://github.com/CodeDotJS/image-of)__ `:` `Download profile picture of any facebook user!`

- __[`gravatar-of`](https://github.com/CodeDotJS/gravatar-of)__ `:` `Download avatar of gravatar users through their email id!`

- __[`twiger`](https://github.com/CodeDotJS/twiger)__ `:` `A complete media downloader for twitter!`

## License

MIT - Copyright &copy; [Rishi Giri](http://rishigiri.ml)
