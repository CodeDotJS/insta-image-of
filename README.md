<p align="center">
<br>
  <a href="https://www.npmjs.com/package/instavim"><img src="https://raw.githubusercontent.com/rishigiridotcom/rishigiri.com/gh-pages/github/instavim.png" alt="Instavim" width="400"></a>
  <br>
  <br>
  <img src="https://travis-ci.org/CodeDotJS/instavim.svg?branch=master">
  <img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg">
</p>

<p align="center"><b>Download profile pictures, public images and videos available on instagram directly from command line.</b></p>


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

## Usage

__`NOTE`__ `:` `Images and videos will be saved under` __`Instagram`__ `folder` `in` __`home directory`__

```
 Usage	  : instavim [command] <username/link>

 Command  :       <for profile picture>
  -s, --small     downlaod profile picture in small resolution
  -m, --medium    download profile picutre in medium resolution
  -f, --full      download profile picture in full resolution

 Note : It works for the accounts which are both, public and private

 Command  :       <download via links>
  -l, --link      download image via link
  -v, --video     download video via link

 Example  :       instavim -f 9gag
                  instavim -l <link>

 Note : Works only if the link is associated with public media
```

## Related

- __[`image-of`](https://github.com/CodeDotJS/image-of)__ `:` `Download profile picture of any facebook user.`

- __[`gravatar-of`](https://github.com/CodeDotJS/gravatar-of)__ `:` `Download avatar of gravatar users through their email id.`

- __[`twiger`](https://github.com/CodeDotJS/twiger)__ `:` `A complete media downloader for twitter.`

## License

MIT - Copyright &copy; [Rishi Giri](http://rishigiri.com)
