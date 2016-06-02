<h1 align="center">
  <a href="https://www.npmjs.com/package/instavim"><img src="http://rishigiri.com/github/instavim.png" alt="Instavim" width="400"></a>
  <br>
  <img src="https://travis-ci.org/CodeDotJS/instavim.svg?branch=master">
</h1>

<p align="center"><b>Download profile pictures, public images and videos available on instagram directly from command line.</b></p>


## Install

```
$ npm install --global instavim
```
__OR BETTER__
```
$ sudo npm install --global instavim
```

## Usage

```
    Usage : instavim <command> [info] <option> [info]           

    Commands:

          u   ❱  instagram username ➨➤ High Resolution
          m   ❱  insatgram username ➨➤ Medium Resolution
          w   ❱  insatgram username ➨➤ Low Resolution
          l   ❱  full link to download image
          v   ❱  full link to download video

    Options:

          -n  ❱  save image or video as                    [required]

    Examples:

         instavim -u [user-name] -n [image-name]
         instavim -l [imageLink] -n [image-name]
         instavim -v [videoLink] -n [video-name]

    Missing required argument: n

```
## Examples

> Copy and paste the following command in your terminal to check it's functionality.


### Profile picture of a user in full resolution


❱ __PUBLIC ACCOUNT__

```
instavim -u iam_rishig -n rishi
```
❱ __PRIVATAE ACCOUNT__

```
instavim -u anshumali -n instaUser
```

### Pofile picture of a user in medium resolution

❱ __PUBLIC ACCOUNT__

```
instavim -m iam_rishig -n rishiMed
```
❱ __PRIVATAE ACCOUNT__

```
instavim -m anshumali -n anshuMed
```

### Profile picture of a user in low resolution

❱ __PUBLIC ACCOUNT__

```
instavim -w iam_rishig -n rishiSM
```
❱ __PRIVATAE ACCOUNT__

```
instavim -w anshumali -n anshuSM
```

### Images which are uploaded publically
```
instavim -l https://www.instagram.com/p/BC2pgFRoUO4/ -n sindresorhus
```

### Vidoes which are uploaded publically
```
instavim -v https://www.instagram.com/p/BD661xeA_V1/ -n bustinbeiber
```

## Exceptions


```
On instagram, not every profile picture is available in High Resolution.
```

```
Small and Medium resolution images may not be available sometime.
```

```
This tool do not download images with privacy === true.
```

## Note

```
1 ❱ Use "https://www" when you are pasting the link in terminal
```
```
2 ❱ Do not give image or video extension when you are downloading them.
  
    Wrong : instavim -u unicorn -n unicornImage.jpg

    Right : instavim -u unicorn -n unicornImage

Same goes for other images and videos.
```
## Screenshot

<h1 align="center">
  <a href=''><img src="http://rishigiri.com/github/instashot.png" alt="Instavim" width="600"></a>
</h1>

## Related

Image-of    [ CLI TOOL ](https://github.com/CodeDotJS/image-of)

Gravatar-of [ CLI TOOL ](https://github.com/CodeDotJS/gravatar-of)

## License

MIT - Copyright &copy; [Rishi Giri](http://rishigiri.com)
