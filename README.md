<h1 align="center">
  <a href="https://www.npmjs.com/package/instavim"><img src="http://rishigiri.com/github/instavim.png" alt="Instavim" width="400"></a>
  <br>
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
    Usage : cli.js <command> [info] <option> [info]           

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
```
Copy and paste the following command in your terminal to check it's functionality.
```
__NOTE__ : Use  CTRL + SHIFT + V [ :]

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
1 ❱ On instagram, not every profile picture is available in High Resolution.
```
```
2 ❱ You may not be able to download the profile pictures of some users in medium and small resolution.
Reason is point 1.
```
```
3 ❱ This tool do not download images which are uploaded by users whose profiles are private.
```

## Note

```
1 ❱ Use "https://www.instagram.com/" when you are pasting the link in terminal
```
```
2 ❱ Do not give image or video extension when you are downloading them.
  
    Wrong : instavim -u unicorn -n unicornImage.jpg

    Right : instavim -u unicorn -n unicornImage

Same goes for other images and videos.
```
## Screenshot


## Related

Image-of    [ CLI TOOL ](https://github.com/CodeDotJS/image-of)

Gravatar-of [ CLI TOOL ](https://github.com/CodeDotJS/gravatar-of)

## License

❱ MIT - Copyright &copy; [Rishi Giri](http://rishigiri.com)
